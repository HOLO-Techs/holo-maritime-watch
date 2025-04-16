
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Window } from '../components/windows/WindowManager';

interface WindowContextType {
  windows: Window[];
  registerWindow: (window: Omit<Window, 'isOpen' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string, isMaximized: boolean) => void;
  openWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(100);
  
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
  
  return (
    <WindowContext.Provider value={{
      windows,
      registerWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximizeWindow,
      openWindow,
      focusWindow
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
};
