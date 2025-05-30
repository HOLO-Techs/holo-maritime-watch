
import React, { useState, useEffect } from 'react';
import { Satellite, Radio, AlertTriangle, Lock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReconUAV from '../alerts/ReconUAV';
import { toast } from 'sonner';

// Interface to communicate with MaritimeMap for area selection
export interface AreaSelectionEvent {
  type: 'satellite' | 'sar' | 'uav';
  active: boolean;
}

const OperationsPanel: React.FC = () => {
  const [activeOperation, setActiveOperation] = useState('satellite');
  const [showUavModal, setShowUavModal] = useState(false);
  const [showLockedFeatureModal, setShowLockedFeatureModal] = useState(false);
  const [areaSelectionActive, setAreaSelectionActive] = useState<AreaSelectionEvent | null>(null);
  
  // Limpiar estado de selección al montar/desmontar componente
  useEffect(() => {
    return () => {
      // Asegurarse de que cualquier selección activa se cancele al desmontar
      if (areaSelectionActive) {
        const event = new CustomEvent('area-selection-update', { 
          detail: { type: areaSelectionActive.type, active: false } 
        });
        window.dispatchEvent(event);
      }
    };
  }, []);
  
  const handleAreaSelectionComplete = (event: Event) => {
    // Get selection details if available
    const detail = (event as CustomEvent).detail;
    console.log("Area selection complete with details:", detail);
    
    // Store the current selection type before clearing
    const currentType = areaSelectionActive?.type;
    
    // Clear the selection state
    setAreaSelectionActive(null);
    
    // Show the appropriate modal based on operation type with a slight delay
    // to allow the map to complete its visual updates first
    setTimeout(() => {
      if (currentType === 'uav') {
        setShowUavModal(true);
      } else {
        setShowLockedFeatureModal(true);
      }
    }, 300);
  };
  
  const handleSatelliteOperation = () => {
    if (areaSelectionActive) {
      // Cancel current selection
      setAreaSelectionActive(null);
      const event = new CustomEvent('area-selection-update', { 
        detail: { type: 'satellite', active: false } 
      });
      window.dispatchEvent(event);
      toast.info("Selección de área cancelada");
      return;
    }
    
    // Start selection mode
    const newAreaSelection = { type: 'satellite', active: true } as AreaSelectionEvent;
    setAreaSelectionActive(newAreaSelection);
    
    // Send event to the map component to enter selection mode
    const event = new CustomEvent('area-selection-update', { 
      detail: newAreaSelection 
    });
    window.dispatchEvent(event);
    
    toast.info("Seleccione un área de 20km x 20km en el mapa");
    
    // Set up listener for when area is selected on map
    window.addEventListener('area-selection-complete', handleAreaSelectionComplete, { once: true });
  };
  
  const handleSarOperation = () => {
    if (areaSelectionActive) {
      // Cancel current selection
      setAreaSelectionActive(null);
      const event = new CustomEvent('area-selection-update', { 
        detail: { type: 'sar', active: false } 
      });
      window.dispatchEvent(event);
      toast.info("Selección de área cancelada");
      return;
    }
    
    // Start selection mode
    const newAreaSelection = { type: 'sar', active: true } as AreaSelectionEvent;
    setAreaSelectionActive(newAreaSelection);
    
    // Send event to the map component to enter selection mode
    const event = new CustomEvent('area-selection-update', { 
      detail: newAreaSelection 
    });
    window.dispatchEvent(event);
    
    toast.info("Seleccione un área de 20km x 20km en el mapa");
    
    // Set up listener for when area is selected on map
    window.addEventListener('area-selection-complete', handleAreaSelectionComplete, { once: true });
  };
  
  const handleUavOperation = () => {
    if (areaSelectionActive) {
      // Cancel current selection
      setAreaSelectionActive(null);
      const event = new CustomEvent('area-selection-update', { 
        detail: { type: 'uav', active: false } 
      });
      window.dispatchEvent(event);
      toast.info("Selección de área cancelada");
      return;
    }
    
    // Start selection mode
    const newAreaSelection = { type: 'uav', active: true } as AreaSelectionEvent;
    setAreaSelectionActive(newAreaSelection);
    
    // Send event to the map component to enter selection mode
    const event = new CustomEvent('area-selection-update', { 
      detail: newAreaSelection 
    });
    window.dispatchEvent(event);
    
    toast.info("Seleccione un área de 20km x 20km en el mapa");
    
    // Set up listener for when area is selected on map
    window.addEventListener('area-selection-complete', handleAreaSelectionComplete, { once: true });
  };
  
  return (
    <>
      <div className="holo-panel">
        <h2 className="holo-title mb-4">Operaciones</h2>
        
        <div className="flex flex-col gap-4">
          {/* Vertical Menu with content below */}
          <div className="space-y-2">
            <button
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left text-sm ${
                activeOperation === 'satellite' 
                  ? 'bg-holo-gold/20 text-holo-gold border border-holo-gold/50' 
                  : 'bg-black/50 text-holo-gray hover:bg-black/70 border border-holo-gold/20'
              }`}
              onClick={() => setActiveOperation('satellite')}
            >
              <Satellite size={16} />
              <span>Imagen Satelital</span>
            </button>
            
            <button
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left text-sm ${
                activeOperation === 'sar' 
                  ? 'bg-holo-gold/20 text-holo-gold border border-holo-gold/50' 
                  : 'bg-black/50 text-holo-gray hover:bg-black/70 border border-holo-gold/20'
              }`}
              onClick={() => setActiveOperation('sar')}
            >
              <Radio size={16} />
              <span>Imagen SAR</span>
            </button>
            
            <button
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left text-sm ${
                activeOperation === 'uav' 
                  ? 'bg-holo-gold/20 text-holo-gold border border-holo-gold/50' 
                  : 'bg-black/50 text-holo-gray hover:bg-black/70 border border-holo-gold/20'
              }`}
              onClick={() => setActiveOperation('uav')}
            >
              <AlertTriangle size={16} />
              <span>Recon UAV</span>
            </button>
          </div>
          
          {/* Content Area */}
          <div className="mt-4">
            {activeOperation === 'satellite' && (
              <div className="space-y-3">
                <p className="text-sm">
                  Solicite una imagen satelital en cualquier punto del mapa. El cursor 
                  mostrará un área de 400 km² (20km x 20km) para captura de imagen.
                </p>
                
                <button 
                  className="holo-button w-full military-cursor"
                  onClick={handleSatelliteOperation}
                >
                  <Satellite size={16} />
                  <span>
                    {areaSelectionActive?.type === 'satellite' 
                      ? 'Cancelar Selección' 
                      : 'Seleccionar Área'}
                  </span>
                </button>
              </div>
            )}
            
            {activeOperation === 'sar' && (
              <div className="space-y-3">
                <p className="text-sm">
                  Solicite una imagen SAR (Radar de Apertura Sintética) de cualquier punto del mapa.
                  Ideal para condiciones de nubosidad o nocturnas.
                </p>
                
                <button 
                  className="holo-button w-full military-cursor"
                  onClick={handleSarOperation}
                >
                  <Radio size={16} />
                  <span>
                    {areaSelectionActive?.type === 'sar' 
                      ? 'Cancelar Selección' 
                      : 'Seleccionar Área'}
                  </span>
                </button>
              </div>
            )}
            
            {activeOperation === 'uav' && (
              <div className="space-y-3">
                <p className="text-sm">
                  Planifique una ruta de reconocimiento con UAV para vigilancia de un área.
                  Puede crear rutas de hasta 5 puntos para maximizar la cobertura.
                </p>
                
                <button 
                  className="holo-button w-full military-cursor"
                  onClick={handleUavOperation}
                >
                  <AlertTriangle size={16} />
                  <span>
                    {areaSelectionActive?.type === 'uav' 
                      ? 'Cancelar Selección' 
                      : 'Seleccionar Área'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* UAV Modal - Increased z-index to ensure visibility */}
      <Dialog open={showUavModal} onOpenChange={setShowUavModal}>
        <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-3xl z-[2000]">
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
      
      {/* Locked Feature Modal - Increased z-index to ensure visibility */}
      <Dialog open={showLockedFeatureModal} onOpenChange={setShowLockedFeatureModal}>
        <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-md z-[2000]">
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
