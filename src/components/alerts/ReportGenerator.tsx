
import React, { useState } from 'react';
import { FileText, Printer, Download } from 'lucide-react';

const ReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
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
          <div className="border border-holo-gray/30 rounded p-4 bg-black/50">
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
              <div className="text-sm text-holo-gray">
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
            <button className="holo-button">
              <Printer size={16} />
              <span>Imprimir</span>
            </button>
            <button className="holo-button">
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
