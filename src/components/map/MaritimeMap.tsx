
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Cable, ZoomIn, ZoomOut } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MaritimeMapProps {
  onAlertClick: () => void;
}

// Extend PolylineOptions to include className
interface ExtendedPolylineOptions extends L.PolylineOptions {
  className?: string;
}

const MaritimeMap: React.FC<MaritimeMapProps> = ({ onAlertClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    if (!mapRef.current) {
      // Initialize the map with OpenStreetMap
      const map = L.map(mapContainerRef.current, {
        center: [13.927512, -78.259939], // Center the map on our critical alert
        zoom: 9,
        zoomControl: false, // We'll add custom zoom controls
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          })
        ]
      });
      
      map.attributionControl.setPrefix('HOLO MARITIME WATCH');
      mapRef.current = map;
      
      // Enable scroll wheel zoom
      map.scrollWheelZoom.enable();
      
      // Create custom icons
      const criticalIcon = L.divIcon({
        className: 'custom-icon',
        html: `
          <div class="relative">
            <div class="absolute -inset-4 bg-red-500/20 rounded-full animate-pulse"></div>
            <div class="relative z-10 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cable"><path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z"/><path d="M2 14h2"/><path d="M20 14h2"/></svg>
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      
      const infoIcon = L.divIcon({
        className: 'custom-icon',
        html: `
          <div class="text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      // Add the markers
      // Critical alert
      const criticalMarker = L.marker([13.927512, -78.259939], { icon: criticalIcon })
        .addTo(map)
        .on('click', onAlertClick);
      
      // Info alerts
      L.marker([13.825412, -78.159939], { icon: infoIcon })
        .addTo(map)
        .bindPopup("<div class='text-center'><strong class='text-blue-400'>INFORMACIÓN</strong><br/>Tráfico inusual<br/>Zona de protección marítima</div>");
      
      L.marker([13.727512, -78.359939], { icon: infoIcon })
        .addTo(map)
        .bindPopup("<div class='text-center'><strong class='text-blue-400'>INFORMACIÓN</strong><br/>Mantenimiento programado<br/>Estación de monitoreo</div>");
      
      // Add grid lines
      const addGridLines = () => {
        const bounds = map.getBounds();
        const north = bounds.getNorth();
        const south = bounds.getSouth();
        const east = bounds.getEast();
        const west = bounds.getWest();
        
        const latStep = (north - south) / 12;
        const lngStep = (east - west) / 12;
        
        // Remove existing grid lines
        map.eachLayer((layer) => {
          if (layer.options && 'className' in layer.options && layer.options.className === 'grid-line') {
            map.removeLayer(layer);
          }
        });
        
        // Add horizontal grid lines
        for (let i = 1; i < 12; i++) {
          const lat = south + i * latStep;
          L.polyline([[lat, west], [lat, east]], {
            color: '#d4af37',
            weight: 0.5,
            opacity: 0.3,
            interactive: false,
            className: 'grid-line'
          } as ExtendedPolylineOptions).addTo(map);
        }
        
        // Add vertical grid lines
        for (let i = 1; i < 12; i++) {
          const lng = west + i * lngStep;
          L.polyline([[south, lng], [north, lng]], {
            color: '#d4af37',
            weight: 0.5,
            opacity: 0.3,
            interactive: false,
            className: 'grid-line'
          } as ExtendedPolylineOptions).addTo(map);
        }
      };
      
      addGridLines();
      map.on('moveend', addGridLines);
      map.on('zoomend', addGridLines);
      
      setMapLoaded(true);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onAlertClick]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

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
      </div>
      
      {/* UI Elements that overlay the map */}
      <div className="absolute top-2 left-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30 z-[1000]">
        <div className="flex items-center gap-2">
          <span className="text-holo-gray/80">Zoom:</span>
          <span className="text-holo-gold">{mapRef.current ? mapRef.current.getZoom().toFixed(1) : '9.0'} km</span>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30 z-[1000]">
        <div className="text-holo-gold/80 font-semibold">Mar Caribe (Colombia)</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-holo-gray/80">Lat:</span>
          <span className="text-holo-gold">13.927512</span>
          <span className="text-holo-gray/80 ml-2">Lon:</span>
          <span className="text-holo-gold">-78.259939</span>
        </div>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/60 text-holo-gray text-xs p-2 rounded border border-holo-gold/30 z-[1000]">
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
      
      {/* Custom Zoom Controls */}
      <div className="absolute right-2 bottom-2 flex flex-col gap-1 z-[1000]">
        <button 
          onClick={handleZoomIn}
          className="bg-black/60 text-holo-gray p-2 rounded border border-holo-gold/30 hover:bg-black/80"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-black/60 text-holo-gray p-2 rounded border border-holo-gold/30 hover:bg-black/80"
        >
          <ZoomOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default MaritimeMap;
