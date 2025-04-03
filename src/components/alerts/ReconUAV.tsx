
import React, { useState, useEffect } from 'react';
import { Radar } from 'lucide-react';

const ReconUAV: React.FC = () => {
  const [searchingUAV, setSearchingUAV] = useState(true);
  const [searchCompleted, setSearchCompleted] = useState(false);
  
  useEffect(() => {
    if (searchingUAV) {
      const timer = setTimeout(() => {
        setSearchingUAV(false);
        setSearchCompleted(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [searchingUAV]);
  
  return (
    <div className="holo-panel">
      <h3 className="holo-title text-sm mb-2">Reconocimiento UAV</h3>
      
      <div className="flex flex-col items-center justify-center min-h-60 border border-holo-gray/30 rounded bg-black/60 p-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-holo-gold/30"></div>
          <Radar size={80} className="text-holo-gold animate-radar-spin opacity-80" />
        </div>
        
        <div className="military-typeface text-center">
          <div className="text-holo-gold mb-2">
            {searchingUAV ? 'BUSCANDO UAVs CERCANOS DISPONIBLES...' : 'BÚSQUEDA COMPLETADA'}
          </div>
          <div className="text-holo-gray/80 text-sm max-w-lg">
            {searchingUAV ? (
              'Localizando unidades para misión de reconocimiento.'
            ) : searchCompleted ? (
              'No existen UAVs disponibles para la operación de reconocimiento en este momento. Las unidades podrían estar en otra misión o en mantenimiento.'
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconUAV;
