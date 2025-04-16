
import React, { useEffect } from 'react';
import { useWindowManager } from '../../contexts/WindowContext';
import ConfigurableWindow from './ConfigurableWindow';

interface WindowContainerProps {
  windows: ReturnType<typeof useWindowManager>['windows'];
  activeWindowId: string | null;
  highestZIndex: number;
}

const WindowContainer: React.FC = () => {
  const { 
    windows, 
    closeWindow, 
    minimizeWindow, 
    toggleMaximizeWindow, 
    focusWindow 
  } = useWindowManager();
  const [activeWindowId, setActiveWindowId] = React.useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = React.useState(100);
  
  // Enfocar una ventana (traerla al frente)
  const handleFocusWindow = (id: string) => {
    setActiveWindowId(id);
    setHighestZIndex(prev => prev + 1);
    focusWindow(id);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Área principal donde se muestran las ventanas */}
      <div className="absolute inset-0">
        {windows.map(window => (
          window.isOpen && !window.isMinimized && (
            <ConfigurableWindow
              key={window.id}
              id={window.id}
              title={window.title}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={toggleMaximizeWindow}
              zIndex={activeWindowId === window.id ? highestZIndex : 100}
              onFocus={handleFocusWindow}
              isMaximized={window.isMaximized}
              defaultPosition={window.defaultPosition}
              defaultSize={window.defaultSize}
            >
              {window.content}
            </ConfigurableWindow>
          )
        ))}
      </div>
      
      {/* Barra inferior para ventanas minimizadas */}
      <div className="absolute bottom-0 left-0 p-2 flex items-center gap-2 z-50">
        {/* Botón para mostrar todas las ventanas disponibles */}
        <div className="relative group">
          <button 
            className="p-2 bg-black/80 border border-holo-gold/50 rounded hover:bg-holo-navy transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-holo-gold"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <line x1="3" x2="21" y1="9" y2="9"/>
              <line x1="9" x2="9" y1="21" y2="9"/>
            </svg>
          </button>
          
          {/* Menú desplegable con todas las ventanas */}
          <div className="absolute bottom-full left-0 mb-2 bg-black/90 border border-holo-gold/50 rounded p-2 hidden group-hover:block min-w-48">
            <div className="text-xs text-holo-gold mb-2 uppercase">Ventanas</div>
            {windows.map(window => (
              <button
                key={window.id}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm ${
                  window.isOpen && !window.isMinimized 
                    ? 'text-holo-gold bg-holo-navy/50' 
                    : 'text-holo-gray hover:bg-holo-navy/30'
                }`}
                onClick={() => focusWindow(window.id)}
              >
                {window.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Ventanas minimizadas */}
        {windows
          .filter(window => window.isOpen && window.isMinimized)
          .map(window => (
            <button
              key={window.id}
              className="px-3 py-1 bg-black/80 border border-holo-gold/50 rounded text-xs text-holo-gray hover:text-holo-gold hover:bg-holo-navy/70 transition-colors"
              onClick={() => focusWindow(window.id)}
            >
              {window.title}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default WindowContainer;
