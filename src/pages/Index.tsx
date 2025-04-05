
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import MaritimeMap from '../components/map/MaritimeMap';
import AlertModal from '../components/alerts/AlertModal';
import OperationsPanel from '../components/operations/OperationsPanel';
import { AlertTriangle, Bell, Calendar, Clock } from 'lucide-react';

const Index = () => {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  
  const handleAlertClick = () => {
    setAlertModalOpen(true);
  };
  
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Main Content Area - Map Only */}
        <div className="col-span-3 h-full relative">
          <div className="h-full">
            <MaritimeMap onAlertClick={handleAlertClick} />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="col-span-1 space-y-4 relative z-20">
          {/* Info Panel */}
          <div className="holo-panel">
            <h2 className="holo-title mb-4">Panel Informativo</h2>
            
            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="border border-blue-500/30 rounded p-2 bg-blue-950/30">
                <div className="flex items-center gap-2 mb-1">
                  <Bell size={16} className="text-blue-400" />
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
                    <Calendar className="h-3 w-3" />
                    <span>2/4/2025</span>
                  </div>
                  <div className="flex items-center gap-1 text-holo-gray/50">
                    <Clock className="h-3 w-3" />
                    <span>19:47:42</span>
                  </div>
                </div>
              </div>
              
              {/* Alert 2 */}
              <div className="border border-blue-500/30 rounded p-2 bg-blue-950/30">
                <div className="flex items-center gap-2 mb-1">
                  <Bell size={16} className="text-blue-400" />
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
                    <Calendar className="h-3 w-3" />
                    <span>2/4/2025</span>
                  </div>
                  <div className="flex items-center gap-1 text-holo-gray/50">
                    <Clock className="h-3 w-3" />
                    <span>18:47:42</span>
                  </div>
                </div>
              </div>
              
              {/* Critical Alert */}
              <div className="border border-red-500/30 rounded p-2 bg-red-950/30">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} className="text-red-400" />
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
                    <Calendar className="h-3 w-3" />
                    <span>2/4/2025</span>
                  </div>
                  <div className="flex items-center gap-1 text-holo-gray/50">
                    <Clock className="h-3 w-3" />
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
          
          {/* Operations Panel */}
          <OperationsPanel />
        </div>
      </div>
      
      {/* Alert Modal */}
      <AlertModal 
        open={alertModalOpen} 
        onOpenChange={setAlertModalOpen} 
      />
    </MainLayout>
  );
};

export default Index;
