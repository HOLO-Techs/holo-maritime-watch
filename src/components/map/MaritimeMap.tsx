
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Cable } from 'lucide-react';
import AlertModal from '../alerts/AlertModal';

interface MaritimeMapProps {
  onAlertClick: () => void;
}

const MaritimeMap: React.FC<MaritimeMapProps> = ({ onAlertClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulating map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded overflow-hidden holo-monitor-border">
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 bg-holo-navy/90"
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-holo-gold text-lg">Cargando mapa territorial...</div>
          </div>
        )}
        
        {mapLoaded && (
          <div className="relative w-full h-full">
            {/* This would be replaced with OpenStreetMap implementation */}
            <div className="absolute inset-0 bg-gradient-to-b from-holo-navy to-black opacity-70"></div>
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-30">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-holo-gold/30" style={{ top: `${(i / 12) * 100}%` }}></div>
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-holo-gold/30" style={{ left: `${(i / 12) * 100}%` }}></div>
              ))}
            </div>
            
            {/* Critical Alert */}
            <button 
              className="absolute group"
              style={{ left: '40%', top: '30%' }}
              onClick={onAlertClick}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-pulse-alert"></div>
                <Cable className="w-6 h-6 text-red-500 z-10" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap border border-red-500/50">
                <div className="text-red-400 font-semibold">ALERTA CRÍTICA</div>
                <div className="text-white/80">Cable submarino</div>
              </div>
            </button>
            
            {/* Info Alert 1 */}
            <div 
              className="absolute cursor-pointer group"
              style={{ left: '35%', top: '40%' }}
            >
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap border border-blue-400/50">
                <div className="text-blue-400 font-semibold">INFORMACIÓN</div>
                <div className="text-white/80">Tráfico inusual</div>
              </div>
            </div>
            
            {/* Info Alert 2 */}
            <div 
              className="absolute cursor-pointer group"
              style={{ left: '45%', top: '35%' }}
            >
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap border border-blue-400/50">
                <div className="text-blue-400 font-semibold">INFORMACIÓN</div>
                <div className="text-white/80">Mantenimiento</div>
              </div>
            </div>
            
            {/* Map UI Elements */}
            <div className="absolute top-2 left-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30">
              <div className="flex items-center gap-2">
                <span className="text-holo-gray/80">Zoom:</span>
                <span className="text-holo-gold">10.5 km</span>
              </div>
            </div>
            
            <div className="absolute bottom-2 left-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30">
              <div className="text-holo-gold/80 font-semibold">Mar Caribe (Colombia)</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-holo-gray/80">Lat:</span>
                <span className="text-holo-gold">13.927512</span>
                <span className="text-holo-gray/80 ml-2">Lon:</span>
                <span className="text-holo-gold">-78.259939</span>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30">
              <div className="text-holo-gold/80 font-semibold mb-1">Leyenda</div>
              <div className="flex items-center gap-1 mb-1">
                <Cable className="w-4 h-4 text-red-500" />
                <span>Alerta Crítica</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                <span>Información</span>
              </div>
            </div>
            
            <div className="absolute bottom-2 right-2 flex flex-col gap-2">
              <button className="bg-black/60 hover:bg-black/80 text-holo-gold w-8 h-8 flex items-center justify-center rounded border border-holo-gold/30">+</button>
              <button className="bg-black/60 hover:bg-black/80 text-holo-gold w-8 h-8 flex items-center justify-center rounded border border-holo-gold/30">−</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaritimeMap;
