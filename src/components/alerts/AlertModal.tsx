
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Lock, 
  Send, 
  Smartphone, 
  Image, 
  Radio, 
  AlertTriangle, 
  Check,
  User,
  X
} from 'lucide-react';
import { toast } from "sonner";
import ReportGenerator from './ReportGenerator';
import SatelliteImageView from './SatelliteImageView';
import SarImageView from './SarImageView';
import ReconUAV from './ReconUAV';

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [encryptionInProgress, setEncryptionInProgress] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const handleEncryptAndSend = () => {
    if (selectedContacts.length === 0) {
      toast.error("Seleccione al menos un contacto para enviar el reporte");
      return;
    }
    
    setEncryptionInProgress(true);
    setTimeout(() => {
      setEncryptionInProgress(false);
      toast.success("Reporte encriptado enviado exitosamente");
      onOpenChange(false);
    }, 2000);
  };

  const toggleContact = (id: number) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const contacts = [
    { id: 1, name: "John Simmons", role: "CCPO - Air Force USA" },
    { id: 2, name: "Jose Diaz", role: "C.C - Armada Mexico" },
    { id: 3, name: "Maria Vasquez", role: "C.C - Armada Colombia" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-500 text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> ALERTA CRÍTICA
          </DialogTitle>
          <DialogDescription className="text-holo-gray/80">
            Alerta de presencia de Embarcación Fantasma Cerca a Cable submarino
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 my-4 text-sm">
          <div className="col-span-3 md:col-span-1 holo-panel">
            <h3 className="holo-title text-sm mb-2">Detalles</h3>
            <div className="space-y-2">
              <div>
                <div className="holo-label">Fuente</div>
                <div className="text-holo-gray">Hidrófono #117</div>
              </div>
              <div>
                <div className="holo-label">Ubicación</div>
                <div className="text-holo-gold">Lat: 13.927512</div>
                <div className="text-holo-gold">Lon: -78.259939</div>
              </div>
              <div>
                <div className="holo-label">Infraestructura afectada</div>
                <div className="text-holo-gray">Cable submarino de comunicaciones</div>
              </div>
              <div>
                <div className="holo-label">Fecha y hora de detección</div>
                <div className="text-holo-gray">2/4/2025, 19:47:42</div>
              </div>
              <div>
                <div className="holo-label">Estado</div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-blink"></span>
                  <span className="text-red-400">Activa</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 md:col-span-2">
            <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6 bg-black border border-holo-gold/30">
                <TabsTrigger value="info" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Información</TabsTrigger>
                <TabsTrigger value="report" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Generar Informe</TabsTrigger>
                <TabsTrigger value="send" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Enviar Reporte</TabsTrigger>
                <TabsTrigger value="satellite" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Imagen Satelital</TabsTrigger>
                <TabsTrigger value="sar" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Imagen SAR</TabsTrigger>
                <TabsTrigger value="uav" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">Recon UAV</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4 holo-panel">
                <h3 className="holo-title text-sm mb-4">Detalles de la Alerta</h3>
                <p className="mb-4">
                  Se ha detectado una embarcación no identificada cerca de un cable submarino de comunicaciones estratégico. 
                  La embarcación no responde a las comunicaciones y presenta patrones de movimiento inusuales.
                </p>
                
                <h4 className="holo-subheading mb-2">Evaluación de Riesgo</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-black/50 p-2 rounded border border-holo-gray/20">
                    <div className="holo-label">Nivel de Amenaza</div>
                    <div className="text-red-500 font-semibold">ALTO</div>
                  </div>
                  <div className="bg-black/50 p-2 rounded border border-holo-gray/20">
                    <div className="holo-label">Confianza</div>
                    <div className="text-amber-500 font-semibold">MEDIA</div>
                  </div>
                  <div className="bg-black/50 p-2 rounded border border-holo-gray/20">
                    <div className="holo-label">Impacto Potencial</div>
                    <div className="text-red-500 font-semibold">CRÍTICO</div>
                  </div>
                </div>
                
                <h4 className="holo-subheading mb-2">Acciones Recomendadas</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Notificar inmediatamente a las autoridades navales</li>
                  <li>Monitorear continuamente la actividad de la embarcación</li>
                  <li>Preparar recursos para una posible intervención</li>
                  <li>Activar protocolos de seguridad de infraestructura submarina</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="report" className="mt-4">
                <ReportGenerator />
              </TabsContent>
              
              <TabsContent value="send" className="mt-4 holo-panel">
                <h3 className="holo-title text-sm mb-2">Enviar Reporte Encriptado</h3>
                
                {encryptionInProgress ? (
                  <div className="flex flex-col items-center justify-center h-40">
                    <div className="mb-4 military-typeface text-holo-gold animate-blink">ENCRIPTANDO...</div>
                    <div className="w-32 h-1 bg-holo-gray/20 rounded-full overflow-hidden">
                      <div className="h-full bg-holo-gold animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="holo-subheading mb-2">Seleccionar Destinatarios</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                        {contacts.map(contact => (
                          <div 
                            key={contact.id} 
                            className={`flex items-center p-2 rounded cursor-pointer ${
                              selectedContacts.includes(contact.id) ? 'bg-holo-gold/20 border border-holo-gold/50' : 'bg-black/50 border border-holo-gray/20'
                            }`}
                            onClick={() => toggleContact(contact.id)}
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium">{contact.name}</div>
                              <div className="text-xs text-holo-gray/70">{contact.role}</div>
                            </div>
                            {selectedContacts.includes(contact.id) ? (
                              <Check className="h-4 w-4 text-holo-gold" />
                            ) : (
                              <User className="h-4 w-4 text-holo-gray/50" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button 
                        className="holo-button"
                        onClick={handleEncryptAndSend}
                      >
                        <Send size={16} />
                        <span>Encriptar y Enviar</span>
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button 
                          className="holo-button opacity-70 cursor-not-allowed"
                          disabled
                        >
                          <Smartphone size={16} />
                          <span>Enviar por WhatsApp</span>
                          <Lock size={14} className="ml-auto" />
                        </button>
                        
                        <button 
                          className="holo-button opacity-70 cursor-not-allowed"
                          disabled
                        >
                          <Send size={16} />
                          <span>Enviar por Telegram</span>
                          <Lock size={14} className="ml-auto" />
                        </button>
                      </div>
                      
                      <div className="mt-2 text-xs text-holo-gray/50 text-center">
                        Las opciones bloqueadas no están disponibles en la versión demo
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="satellite" className="mt-4">
                <SatelliteImageView />
              </TabsContent>
              
              <TabsContent value="sar" className="mt-4">
                <SarImageView />
              </TabsContent>
              
              <TabsContent value="uav" className="mt-4">
                <ReconUAV />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-2">
          <button 
            className="px-4 py-2 rounded bg-red-900/50 text-red-200 border border-red-500/30 hover:bg-red-900/70 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <X size={16} className="inline mr-1" /> Cerrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
