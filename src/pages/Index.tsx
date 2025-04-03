
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import MaritimeMap from '../components/map/MaritimeMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertModal from '../components/alerts/AlertModal';
import ChatInterface from '../components/chat/ChatInterface';
import OperationsPanel from '../components/operations/OperationsPanel';
import { AlertTriangle, Bell, Calendar, Clock } from 'lucide-react';

const Index = () => {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  
  const handleAlertClick = () => {
    setAlertModalOpen(true);
  };
  
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Main Content Area */}
        <div className="col-span-3 h-full">
          <Tabs defaultValue="map" className="h-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-black border border-holo-gold/30">
              <TabsTrigger value="map" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
                Mapa Territorial
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
                Comunicaciones
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
                Contactos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-4 h-[calc(100%-48px)]">
              <MaritimeMap onAlertClick={handleAlertClick} />
            </TabsContent>
            
            <TabsContent value="chat" className="mt-4 h-[calc(100%-48px)]">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-4 h-[calc(100%-48px)]">
              <div className="h-full holo-monitor-border bg-black/80 rounded overflow-hidden p-4">
                <h2 className="holo-title mb-4">Contactos</h2>
                <p className="text-holo-gray mb-4">
                  Esta sección muestra sus contactos establecidos y permite buscar nuevos contactos para establecer comunicación.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* This would be a component that shows contacts and uses the same contact list as the chat component */}
                  <div className="holo-panel">
                    <h3 className="holo-subheading mb-2">Contactos Recientes</h3>
                    <div className="space-y-2">
                      <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                          JS
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">John Simmons</div>
                          <div className="text-xs text-holo-gray/70">CCPO - Air Force USA</div>
                        </div>
                      </div>
                      <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                          JD
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Jose Diaz</div>
                          <div className="text-xs text-holo-gray/70">C.C - Armada Mexico</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="holo-panel">
                    <h3 className="holo-subheading mb-2">Buscar Nuevos Contactos</h3>
                    <p className="text-xs text-holo-gray/70 mb-2">
                      Busque contactos para establecer una conexión segura.
                    </p>
                    <div className="relative mb-4">
                      <input 
                        type="text" 
                        placeholder="Nombre, cargo, organización..." 
                        className="holo-input w-full"
                      />
                    </div>
                    <div className="text-center text-xs text-holo-gray/50">
                      Ingrese términos de búsqueda para encontrar contactos
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Sidebar */}
        <div className="col-span-1 space-y-4">
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
