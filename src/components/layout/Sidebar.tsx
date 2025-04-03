
import React, { useState } from 'react';
import { 
  Map, 
  MessageSquare, 
  Users, 
  Bell, 
  AlertTriangle,
  Satellite, 
  Radio, 
  Shield, 
  Settings,
  Lock
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-holo-navy border-r border-holo-gold/50 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-holo-gold/30">
          <h2 className="text-holo-gold text-lg font-semibold mb-1">HOLO CONSOLE</h2>
          <p className="text-holo-gray/70 text-xs">DEMO VERSION 1.0</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-1">
            {[
              { icon: <Map size={18} />, label: 'Mapa Territorial', path: '/', active: currentPath === '/' },
              { icon: <MessageSquare size={18} />, label: 'Comunicaciones', path: '/chat', active: currentPath === '/chat', badge: 2 },
              { icon: <Users size={18} />, label: 'Contactos', path: '/contacts', active: currentPath === '/contacts' },
              { icon: <Bell size={18} />, label: 'Alertas', path: '/alerts', active: currentPath === '/alerts', badge: 3 },
              { icon: <AlertTriangle size={18} />, label: 'Incidentes', path: '/incidents', active: currentPath === '/incidents' },
              { icon: <Satellite size={18} />, label: 'Satélites', path: '/satellites', active: currentPath === '/satellites', locked: true },
              { icon: <Radio size={18} />, label: 'Hidrófonos', path: '/hydrophones', active: currentPath === '/hydrophones', locked: true },
              { icon: <Shield size={18} />, label: 'Seguridad', path: '/security', active: currentPath === '/security', locked: true },
            ].map((item, index) => (
              <li key={index}>
                <button 
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    item.active 
                      ? 'bg-holo-gold/10 text-holo-gold border-l-2 border-holo-gold' 
                      : 'text-holo-gray hover:bg-black/20'
                  }`}
                  onClick={() => !item.locked && handleNavigation(item.path)}
                  disabled={item.locked}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {item.locked && (
                    <Lock size={14} className="ml-auto text-holo-gray/50" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-holo-gold/30">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-holo-gray" />
            <span className="text-holo-gray text-sm">Configuración</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
