
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Maximize2 } from 'lucide-react';

const SatelliteImageView: React.FC = () => {
  return (
    <div className="holo-panel overflow-hidden">
      <h3 className="holo-title text-sm mb-2">Imágenes Satelitales</h3>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid grid-cols-2 bg-black border border-holo-gold/30 mb-4">
          <TabsTrigger value="recent" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold">
            Imágenes recientes
          </TabsTrigger>
          <TabsTrigger value="request" className="data-[state=active]:bg-holo-gold/20 data-[state=active]:text-holo-gold opacity-60" disabled>
            Solicitar nueva imagen
            <Lock size={12} className="ml-1" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-0">
          <div className="border border-holo-gray/30 rounded overflow-hidden">
            <div className="bg-black/70 p-2 text-xs text-holo-gray flex justify-between">
              <span>Hace 44 minutos</span>
              <span className="text-holo-gold">Lat: 13.927512 Lon: -78.259939</span>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/28471435-86a2-4cdd-a04a-531532e08d12.png" 
                alt="Imagen Satelital" 
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
                <span>Resolución: 1.5m</span>
                <span>Fuente: Satélite HOLO - Francisco de paula Santander</span>
              </div>
              <div className="text-right text-holo-gray/70">ID: IMG-4805</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-holo-gray/70">
            <div className="holo-subheading text-xs mb-1">Análisis de imagen</div>
            <p className="mb-2">
              La imagen muestra un objeto no identificado con estela característica de desplazamiento subacuático.
              El patrón de movimiento es consistente con una embarcación submarina de aproximadamente 30 metros de eslora.
            </p>
            <div className="holo-subheading text-xs mb-1">Metadatos</div>
            <div className="grid grid-cols-2 gap-1">
              <div>Altitud: 705 km</div>
              <div>Ángulo: 32°</div>
              <div>Banda: Multiespectral</div>
              <div>Condiciones: Despejado</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="request">
          <div className="flex flex-col items-center justify-center h-64 border border-holo-gray/30 rounded">
            <Lock size={24} className="text-holo-gray/50 mb-2" />
            <p className="text-sm text-holo-gray/70">No disponible en la versión demo</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SatelliteImageView;
