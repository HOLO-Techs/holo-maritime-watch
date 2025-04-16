
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Maximize2 } from 'lucide-react';

const SarImageView: React.FC = () => {
  return (
    <div className="holo-panel overflow-hidden">
      <h3 className="holo-title text-sm mb-2">Imágenes SAR</h3>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid grid-cols-2 bg-black border border-holo-gold/30 mb-4">
          <TabsTrigger value="recent" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
            Imágenes recientes
          </TabsTrigger>
          <TabsTrigger value="request" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold disabled:bg-black/70 disabled:text-holo-gray/40 disabled:cursor-not-allowed disabled:border-holo-gray/20" disabled>
            <div className="flex items-center gap-1">
              <span>Solicitar nueva imagen</span>
              <Lock size={12} />
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-0">
          <div className="border border-holo-gray/30 rounded overflow-hidden">
            <div className="bg-black/70 p-2 text-xs text-holo-gray flex justify-between">
              <span>Hace 18 minutos</span>
              <span className="text-holo-gold">Lat: 13.927512 Lon: -78.259939</span>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/befcd5fe-c34e-4a52-9492-b065a4fefbfa.png" 
                alt="Imagen SAR" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1 cursor-pointer">
                <Maximize2 size={16} className="text-holo-gold" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-black/70 px-3 py-1 rounded text-sm">Doble clic para ampliar</div>
              </div>
            </div>
            
            <div className="bg-black/70 p-2 text-xs text-holo-gray">
              <div className="flex justify-between">
                <span>Resolución: 10m</span>
                <span>Fuente: HOLO SAR - Gran Colombia 009</span>
              </div>
              <div className="text-right text-holo-gray/70">ID: IMG-2500</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-holo-gray/70">
            <div className="holo-subheading text-xs mb-1">Análisis de imagen</div>
            <p className="mb-2">
              La imagen SAR revela una perturbación en la superficie del agua consistente con actividad submarina.
              El patrón de reflexión radar indica la presencia de un objeto metálico de considerable tamaño.
            </p>
            <div className="holo-subheading text-xs mb-1">Metadatos</div>
            <div className="grid grid-cols-2 gap-1">
              <div>Frecuencia: Banda X</div>
              <div>Polarización: VV/VH</div>
              <div>Estado del mar: 2</div>
              <div>Viento: 8 nudos NE</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="request">
          <div className="flex flex-col items-center justify-center h-64 border border-holo-gray/30 rounded p-4">
            <Lock size={24} className="text-holo-gray/50 mb-2" />
            <p className="text-sm text-holo-gray/70 mb-4">
              No disponible en la versión demo
            </p>
            <button 
              className="holo-button opacity-70 cursor-not-allowed" 
              disabled
            >
              <Lock size={16} className="mr-1" />
              Función Bloqueada
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SarImageView;
