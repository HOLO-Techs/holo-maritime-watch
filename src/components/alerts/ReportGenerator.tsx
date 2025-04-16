import React, { useState, useRef } from 'react';
import { FileText, Printer, Download } from 'lucide-react';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';

const ReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const handlePrintReport = () => {
    if (reportRef.current) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        const reportHTML = reportRef.current.innerHTML;
        printWindow.document.write(`
          <html>
            <head>
              <title>Informe de Alerta Crítica</title>
              <style>
                body { font-family: 'Courier New', monospace; padding: 20px; }
                .title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 15px; }
                .section { margin-bottom: 15px; }
                .label { font-size: 11px; text-transform: uppercase; color: #666; margin-bottom: 3px; }
                .content { margin-bottom: 10px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .full-width { grid-column: span 2; }
                .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; text-align: center; font-size: 11px; color: #999; }
                .images { display: flex; gap: 10px; margin: 15px 0; }
                .image-container { border: 1px solid #ccc; padding: 5px; }
                .image-title { font-size: 11px; text-align: center; margin-top: 5px; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <div class="report">
                ${reportHTML}
              </div>
              <script>
                window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        toast.success('Imprimiendo informe...');
      } else {
        toast.error('No se pudo abrir la ventana de impresión. Verifique la configuración de su navegador.');
      }
    }
  };

  const handleDownloadReport = () => {
    if (reportRef.current) {
      toast.info('Generando PDF...');
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Informe_Alerta_Critica.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf()
        .from(reportRef.current)
        .set(opt)
        .save()
        .then(() => {
          toast.success('Informe PDF descargado con éxito');
        })
        .catch((error) => {
          console.error('Error al generar PDF:', error);
          toast.error('Error al generar el PDF. Por favor, intente nuevamente.');
        });
    }
  };

  return (
    <div className="holo-panel">
      <h3 className="holo-title text-sm mb-2">Generador de Informes</h3>
      
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center h-60">
          <div className="mb-4 military-typeface text-holo-gold">GENERANDO INFORME...</div>
          <div className="w-48 h-1 bg-holo-gray/20 rounded-full overflow-hidden">
            <div className="h-full bg-holo-gold animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      ) : reportGenerated ? (
        <div className="space-y-4">
          <div ref={reportRef} className="border border-holo-gray/30 rounded p-4 bg-black/50">
            <h4 className="text-holo-gold border-b border-holo-gold/30 pb-2 mb-3 font-medium">INFORME DE ALERTA CRÍTICA</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="holo-label">FECHA Y HORA</div>
                <div className="text-holo-gray">2/4/2025, 19:47:42</div>
              </div>
              <div>
                <div className="holo-label">TIPO DE ALERTA</div>
                <div className="text-red-400">Crítica - Infraestructura</div>
              </div>
              <div>
                <div className="holo-label">PRIORIDAD</div>
                <div className="text-red-400">Alta</div>
              </div>
              <div>
                <div className="holo-label">ESTADO</div>
                <div className="text-amber-400">En curso</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="holo-label">UBICACIÓN</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="text-holo-gray/70">Coordenadas: </span>
                  <span className="text-holo-gold">Lat: 13.927512, Lon: -78.259939</span>
                </div>
                <div className="text-sm">
                  <span className="text-holo-gray/70">Área: </span>
                  <span className="text-holo-gray">Mar Caribe (Colombia)</span>
                </div>
                <div className="text-sm col-span-2">
                  <span className="text-holo-gray/70">Infraestructura: </span>
                  <span className="text-holo-gray">Cable submarino de comunicaciones</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="holo-label">DETALLES DE DETECCIÓN</div>
              <div className="text-sm text-holo-gray">
                Hidrófono #117 ha detectado una embarcación no identificada a proximidad del cable submarino.
                La embarcación presenta patrones de movimiento anómalos y no responde a comunicaciones.
                Las características de propulsión sugieren que podría tratarse de un submarino no convencional.
              </div>
            </div>

            <div className="mb-4">
              <div className="holo-label">EVIDENCIA VISUAL</div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="border border-holo-gray/30 rounded overflow-hidden">
                  <div className="bg-black/70 p-1 text-xs text-holo-gray">Imagen Satelital</div>
                  <img 
                    src="/lovable-uploads/28471435-86a2-4cdd-a04a-531532e08d12.png" 
                    alt="Imagen Satelital" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="bg-black/70 p-1 text-[10px] text-holo-gray/70">
                    <div className="flex justify-between">
                      <span>ID: IMG-4805</span>
                      <span>Hace 44 min</span>
                    </div>
                  </div>
                </div>
                <div className="border border-holo-gray/30 rounded overflow-hidden">
                  <div className="bg-black/70 p-1 text-xs text-holo-gray">Imagen SAR</div>
                  <img 
                    src="/lovable-uploads/befcd5fe-c34e-4a52-9492-b065a4fefbfa.png" 
                    alt="Imagen SAR" 
                    className="w-full h-auto object-cover" 
                  />
                  <div className="bg-black/70 p-1 text-[10px] text-holo-gray/70">
                    <div className="flex justify-between">
                      <span>ID: IMG-2500</span>
                      <span>Hace 18 min</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-holo-gray mt-2">
                Disponibles imágenes satelitales y SAR que confirman la presencia de un objeto no identificado
                en las coordenadas indicadas. Las imágenes muestran una estela térmica característica de
                propulsión submarina.
              </div>
            </div>
            
            <div className="mb-4">
              <div className="holo-label">ACCIONES TOMADAS</div>
              <ul className="list-disc list-inside text-sm text-holo-gray">
                <li>Alerta generada y enviada a personal autorizado</li>
                <li>Monitoreo de la zona activado en alta prioridad</li>
                <li>Protocolos de seguridad de infraestructura activados</li>
              </ul>
            </div>
            
            <div>
              <div className="holo-label">RECOMENDACIONES</div>
              <ul className="list-disc list-inside text-sm text-holo-gray">
                <li>Desplegar unidades de vigilancia naval a la zona</li>
                <li>Iniciar comunicaciones con la embarcación</li>
                <li>Preparar recursos para inspección submarina del cable</li>
                <li>Activar canal de comunicación de emergencia con autoridades</li>
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-holo-gray/30 text-xs text-center text-holo-gray/50">
              INFORME GENERADO POR SISTEMA HOLO - USO OFICIAL - CLASIFICADO
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button className="holo-button" onClick={handlePrintReport}>
              <Printer size={16} />
              <span>Imprimir</span>
            </button>
            <button className="holo-button" onClick={handleDownloadReport}>
              <Download size={16} />
              <span>Descargar</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-sm">
            Este sistema generará un informe detallado basado en toda la información disponible sobre la alerta.
            El informe incluirá detalles técnicos, evaluación de riesgo, y recomendaciones de acción.
          </p>
          
          <div className="bg-black/50 border border-holo-gray/30 rounded p-3 mb-4">
            <h4 className="text-holo-gold text-sm mb-2">El informe incluirá:</h4>
            <ul className="list-disc list-inside text-sm text-holo-gray space-y-1">
              <li>Información general (fecha, tipo de alerta, prioridad, estado)</li>
              <li>Ubicación (coordenadas, área, infraestructura)</li>
              <li>Detalles de detección</li>
              <li>Evidencia visual (imágenes satelitales y SAR)</li>
              <li>Acciones tomadas</li>
              <li>Recomendaciones</li>
            </ul>
          </div>
          
          <button
            className="holo-button w-full"
            onClick={handleGenerateReport}
          >
            <FileText size={16} />
            <span>Generar Informe</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
