
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Satellite, Radio, AlertTriangle, Lock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReconUAV from '../alerts/ReconUAV';

const OperationsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('satellite');
  const [showUavModal, setShowUavModal] = useState(false);
  const [showLockedFeatureModal, setShowLockedFeatureModal] = useState(false);
  
  const handleSatelliteOperation = () => {
    setShowLockedFeatureModal(true);
  };
  
  const handleSarOperation = () => {
    setShowLockedFeatureModal(true);
  };
  
  const handleUavOperation = () => {
    setShowUavModal(true);
  };
  
  return (
    <>
      <div className="holo-panel">
        <h2 className="holo-title mb-4">Operaciones</h2>
        
        <Tabs defaultValue="satellite" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-black border border-holo-gold/30">
            <TabsTrigger value="satellite" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
              <Satellite size={16} className="mr-2" />
              <span>Imagen Satelital</span>
            </TabsTrigger>
            <TabsTrigger value="sar" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
              <Radio size={16} className="mr-2" />
              <span>Imagen SAR</span>
            </TabsTrigger>
            <TabsTrigger value="uav" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
              <AlertTriangle size={16} className="mr-2" />
              <span>Recon UAV</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="satellite">
            <div className="space-y-3">
              <p className="text-sm">
                Solicite una imagen satelital en cualquier punto del mapa. El cursor 
                mostrará un área de 100 km² (10km x 10km) para captura de imagen.
              </p>
              
              <div className="bg-black/50 border border-holo-gold/30 rounded-md p-3">
                <h4 className="text-holo-gold text-sm mb-2">Parámetros de captura</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="holo-label block mb-1">Resolución</label>
                    <select className="holo-input w-full">
                      <option>Alta (1m)</option>
                      <option>Media (5m)</option>
                      <option>Baja (10m)</option>
                    </select>
                  </div>
                  <div>
                    <label className="holo-label block mb-1">Prioridad</label>
                    <select className="holo-input w-full">
                      <option>Alta</option>
                      <option>Media</option>
                      <option>Baja</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button 
                className="holo-button w-full military-cursor"
                onClick={handleSatelliteOperation}
              >
                <Satellite size={16} />
                <span>Iniciar Selección de Área</span>
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="sar">
            <div className="space-y-3">
              <p className="text-sm">
                Solicite una imagen SAR (Radar de Apertura Sintética) de cualquier punto del mapa.
                Ideal para condiciones de nubosidad o nocturnas.
              </p>
              
              <div className="bg-black/50 border border-holo-gold/30 rounded-md p-3">
                <h4 className="text-holo-gold text-sm mb-2">Parámetros de captura</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="holo-label block mb-1">Banda</label>
                    <select className="holo-input w-full">
                      <option>Banda X</option>
                      <option>Banda C</option>
                      <option>Banda L</option>
                    </select>
                  </div>
                  <div>
                    <label className="holo-label block mb-1">Polarización</label>
                    <select className="holo-input w-full">
                      <option>VV/VH</option>
                      <option>HH/HV</option>
                      <option>Full</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button 
                className="holo-button w-full military-cursor"
                onClick={handleSarOperation}
              >
                <Radio size={16} />
                <span>Iniciar Selección de Área</span>
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="uav">
            <div className="space-y-3">
              <p className="text-sm">
                Planifique una ruta de reconocimiento con UAV para vigilancia de un área.
                Puede crear rutas de hasta 5 puntos para maximizar la cobertura.
              </p>
              
              <div className="bg-black/50 border border-holo-gold/30 rounded-md p-3">
                <h4 className="text-holo-gold text-sm mb-2">Parámetros de misión</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="holo-label block mb-1">Altitud</label>
                    <select className="holo-input w-full">
                      <option>Baja (500m)</option>
                      <option>Media (1000m)</option>
                      <option>Alta (3000m)</option>
                    </select>
                  </div>
                  <div>
                    <label className="holo-label block mb-1">Velocidad</label>
                    <select className="holo-input w-full">
                      <option>Estándar</option>
                      <option>Crucero</option>
                      <option>Máxima</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button 
                className="holo-button w-full military-cursor"
                onClick={handleUavOperation}
              >
                <AlertTriangle size={16} />
                <span>Iniciar Planificación de Ruta</span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* UAV Modal */}
      <Dialog open={showUavModal} onOpenChange={setShowUavModal}>
        <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-holo-gold text-xl">Solicitar Recon UAV</DialogTitle>
          </DialogHeader>
          
          <ReconUAV />
          
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 rounded bg-holo-gray/20 text-holo-gray hover:bg-holo-gray/30 transition-colors"
              onClick={() => setShowUavModal(false)}
            >
              Cerrar
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Locked Feature Modal */}
      <Dialog open={showLockedFeatureModal} onOpenChange={setShowLockedFeatureModal}>
        <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-md">
          <DialogHeader>
            <DialogTitle className="text-holo-gold flex items-center gap-2">
              <Lock size={18} /> Funcionalidad Limitada
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 text-center">
            <Lock size={32} className="mx-auto mb-4 text-holo-gray/50" />
            <p className="text-holo-gray mb-2">
              Esta opción no está disponible para la versión demo.
            </p>
            <p className="text-holo-gray/70 text-sm">
              Contacte a su administrador para desbloquear todas las funcionalidades.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              className="px-4 py-2 rounded bg-holo-gray/20 text-holo-gray hover:bg-holo-gray/30 transition-colors"
              onClick={() => setShowLockedFeatureModal(false)}
            >
              Entendido
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OperationsPanel;
