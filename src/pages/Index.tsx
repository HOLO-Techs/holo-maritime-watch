
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import MaritimeMap from '../components/map/MaritimeMap';
import AlertModal from '../components/alerts/AlertModal';
import OperationsPanel from '../components/operations/OperationsPanel';
import SatelliteImageView from '../components/alerts/SatelliteImageView'; 
import WindowContainer from '../components/windows/WindowContainer';
import { useWindowManager } from '../contexts/WindowContext';
import { Settings } from 'lucide-react';

const Index = () => {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const { registerWindow } = useWindowManager();
  
  const handleAlertClick = () => {
    setAlertModalOpen(true);
  };
  
  // Registrar nuestras ventanas cuando el componente se monta
  useEffect(() => {
    // Ventana del mapa
    registerWindow({
      id: 'map',
      title: 'Mapa Territorial',
      content: <MaritimeMap onAlertClick={handleAlertClick} />,
      defaultPosition: { x: 10, y: 10 },
      defaultSize: { width: 800, height: 600 }
    });
    
    // Ventana del panel informativo
    registerWindow({
      id: 'info-panel',
      title: 'Panel Informativo',
      content: (
        <div className="holo-panel h-full">
          <h2 className="holo-title mb-4">Panel Informativo</h2>
          
          <div className="space-y-3">
            {/* Alert 1 */}
            <div className="border border-blue-500/30 rounded p-2 bg-blue-950/30">
              <div className="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                  <path d="m10.67 21.33 5.66-5.66"></path>
                  <path d="M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                </svg>
                <span className="text-blue-400 font-medium text-sm">INFORMACIÓN</span>
              </div>
              <div className="text-sm mb-1">Tráfico inusual detectado</div>
              <div className="grid grid-cols-2 gap-1 text-xs text-holo-gray/70">
                <div>
                  <span className="text-holo-gray/50">Lat: </span>
                  <span>13.825412</span>
                </div>
                <div>
                  <span className="text-holo-gray/50">Lon: </span>
                  <span>-78.159939</span>
                </div>
              </div>
              <div className="text-xs text-holo-gray/70">Zona de protección marítima</div>
              <div className="flex justify-between items-center mt-1 text-xs">
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>2/4/2025</span>
                </div>
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>19:47:42</span>
                </div>
              </div>
            </div>
            
            {/* Alert 2 */}
            <div className="border border-blue-500/30 rounded p-2 bg-blue-950/30">
              <div className="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                  <path d="m10.67 21.33 5.66-5.66"></path>
                  <path d="M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                </svg>
                <span className="text-blue-400 font-medium text-sm">INFORMACIÓN</span>
              </div>
              <div className="text-sm mb-1">Mantenimiento programado</div>
              <div className="grid grid-cols-2 gap-1 text-xs text-holo-gray/70">
                <div>
                  <span className="text-holo-gray/50">Lat: </span>
                  <span>13.727512</span>
                </div>
                <div>
                  <span className="text-holo-gray/50">Lon: </span>
                  <span>-78.359939</span>
                </div>
              </div>
              <div className="text-xs text-holo-gray/70">Estación de monitoreo</div>
              <div className="flex justify-between items-center mt-1 text-xs">
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>2/4/2025</span>
                </div>
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>18:47:42</span>
                </div>
              </div>
            </div>
            
            {/* Critical Alert */}
            <div className="border border-red-500/30 rounded p-2 bg-red-950/30">
              <div className="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" x2="12" y1="9" y2="13"></line>
                  <line x1="12" x2="12.01" y1="17" y2="17"></line>
                </svg>
                <span className="text-red-400 font-medium text-sm">ALERTA CRÍTICA</span>
              </div>
              <div className="text-sm mb-1">Cable submarino comprometido</div>
              <div className="grid grid-cols-2 gap-1 text-xs text-holo-gray/70">
                <div>
                  <span className="text-holo-gray/50">Lat: </span>
                  <span>13.927512</span>
                </div>
                <div>
                  <span className="text-holo-gray/50">Lon: </span>
                  <span>-78.259939</span>
                </div>
              </div>
              <div className="text-xs text-holo-gray/70">Hidrófono #117</div>
              <div className="flex justify-between items-center mt-1 text-xs">
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>2/4/2025</span>
                </div>
                <div className="flex items-center gap-1 text-holo-gray/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>19:47:42</span>
                </div>
              </div>
              <button 
                className="mt-2 text-xs w-full py-1 bg-red-900/50 text-red-200 rounded border border-red-500/30 hover:bg-red-900/70"
                onClick={handleAlertClick}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      ),
      defaultPosition: { x: 820, y: 10 },
      defaultSize: { width: 350, height: 600 }
    });
    
    // Ventana de operaciones
    registerWindow({
      id: 'operations',
      title: 'Operaciones',
      content: <OperationsPanel />,
      defaultPosition: { x: 10, y: 620 },
      defaultSize: { width: 600, height: 350 }
    });
    
    // Ventana de configuración
    registerWindow({
      id: 'settings',
      title: 'Configuración',
      content: (
        <div className="holo-panel h-full">
          <h2 className="holo-title mb-4">Configuración</h2>
          <div className="space-y-4">
            <div className="border border-holo-gold/30 rounded p-4 bg-black/60">
              <h3 className="text-holo-gold text-sm mb-3 flex items-center gap-2">
                <Settings size={16} />
                <span>Preferencias de Interfaz</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-holo-gray">Modo oscuro</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-holo-gold after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border after:border-holo-gold/30 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-holo-gold/30"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-holo-gray">Transparencia ventanas</span>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-24 h-2 bg-gray-700 rounded-lg cursor-pointer dark:bg-gray-700" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-holo-gray">Tamaño fuente</span>
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 flex items-center justify-center bg-black/80 border border-holo-gold/30 rounded text-holo-gold">-</button>
                    <span className="text-sm text-holo-gold">12px</span>
                    <button className="w-6 h-6 flex items-center justify-center bg-black/80 border border-holo-gold/30 rounded text-holo-gold">+</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-holo-gold/30 rounded p-4 bg-black/60">
              <h3 className="text-holo-gold text-sm mb-3">Preferencias del Mapa</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-holo-gray">Mostrar grid</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-holo-gold after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border after:border-holo-gold/30 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-holo-gold/30"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-holo-gray">Mostrar coordenadas</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-holo-gold after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border after:border-holo-gold/30 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-holo-gold/30"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      defaultPosition: { x: 620, y: 620 },
      defaultSize: { width: 550, height: 350 }
    });
    
    // Ventana de satélite
    registerWindow({
      id: 'satellite',
      title: 'Vista Satelital',
      content: <SatelliteImageView />,
      defaultPosition: { x: 620, y: 100 },
      defaultSize: { width: 550, height: 450 }
    });
    
  }, [registerWindow]);
  
  return (
    <MainLayout>
      <div className="w-full h-full">
        <WindowContainer />
        
        {/* Alert Modal */}
        <AlertModal 
          open={alertModalOpen} 
          onOpenChange={setAlertModalOpen} 
        />
      </div>
    </MainLayout>
  );
};

export default Index;
