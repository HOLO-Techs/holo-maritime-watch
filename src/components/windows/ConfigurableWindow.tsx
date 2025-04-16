
import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string, isMaximized: boolean) => void;
  zIndex: number;
  onFocus: (id: string) => void;
  isMaximized?: boolean;
}

const ConfigurableWindow: React.FC<WindowProps> = ({
  id,
  title,
  children,
  defaultPosition = { x: 20, y: 20 },
  defaultSize = { width: 500, height: 400 },
  minWidth = 250,
  minHeight = 200,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  onFocus,
  isMaximized = false,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  
  // Focus this window when clicked
  const handleWindowClick = () => {
    onFocus(id);
  };
  
  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartPosition({ x: e.clientX, y: e.clientY });
    setResizeStartSize({ width: size.width, height: size.height });
  };
  
  // Effect to handle mouse move and up events for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Ensure the window stays within the viewport
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPosition.x;
        const deltaY = e.clientY - resizeStartPosition.y;
        
        const newWidth = Math.max(minWidth, resizeStartSize.width + deltaX);
        const newHeight = Math.max(minHeight, resizeStartSize.height + deltaY);
        
        setSize({ width: newWidth, height: newHeight });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStartPosition, resizeStartSize, minWidth, minHeight]);
  
  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute border border-holo-gold/50 bg-black rounded overflow-hidden shadow-lg",
        isMaximized ? "inset-0 w-full h-full" : ""
      )}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
        zIndex: zIndex,
      }}
      onClick={handleWindowClick}
    >
      {/* Window header - draggable */}
      <div 
        className="bg-holo-navy border-b border-holo-gold/30 px-4 py-2 flex items-center justify-between cursor-move"
        onMouseDown={handleDragStart}
      >
        <h3 className="text-holo-gold text-sm font-medium truncate">{title}</h3>
        <div className="flex items-center gap-2">
          <button 
            className="text-holo-gray hover:text-holo-gold p-1 focus:outline-none"
            onClick={() => onMinimize(id)}
          >
            <Minimize2 size={16} />
          </button>
          <button 
            className="text-holo-gray hover:text-holo-gold p-1 focus:outline-none"
            onClick={() => onMaximize(id, !isMaximized)}
          >
            <Maximize2 size={16} />
          </button>
          <button 
            className="text-holo-gray hover:text-red-400 p-1 focus:outline-none"
            onClick={() => onClose(id)}
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="w-full h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
      
      {/* Resize handle */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-holo-gold/50"
          >
            <path d="M22 22L12 22M22 22L22 12M22 22L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ConfigurableWindow;
