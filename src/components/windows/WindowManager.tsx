
import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import ConfigurableWindow from './ConfigurableWindow';

export interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const WindowManager: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [windowsReady, setWindowsReady] = useState(false);
  
  // Registrar una ventana al gestor
  const registerWindow = (window: Omit<Window, 'isOpen' | 'isMinimized' | 'isMaximized'>) => {
    setWindows(prev => {
      // Si la ventana ya existe, no la registramos nuevamente
      if (prev.some(w => w.id === window.id)) {
        return prev;
      }
      
      return [...prev, {
        ...window,
        isOpen: true,
        isMinimized: false,
        isMaximized: false
      }];
    });
  };
  
  // Cerrar una ventana
  const closeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, isOpen: false } : window
      )
    );
  };
  
  // Minimizar una ventana
  const minimizeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, isMinimized: true } : window
      )
    );
  };
  
  // Maximizar/restaurar una ventana
  const toggleMaximizeWindow = (id: string, isMaximized: boolean) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, isMaximized } : window
      )
    );
  };
  
  // Abrir una ventana (desde minimizado o cerrado)
  const openWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, isOpen: true, isMinimized: false } : window
      )
    );
    focusWindow(id);
  };
  
  // Enfocar una ventana (traerla al frente)
  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setHighestZIndex(prev => prev + 1);
  };
  
  // Efecto para configurar ventanas iniciales
  useEffect(() => {
    // Las ventanas se configurarán en el componente principal Index.tsx
    setWindowsReady(true);
  }, []);
  
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
              onFocus={focusWindow}
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
            <Layers size={20} className="text-holo-gold" />
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
                onClick={() => openWindow(window.id)}
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
              onClick={() => openWindow(window.id)}
            >
              {window.title}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default WindowManager;
