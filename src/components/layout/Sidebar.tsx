
import React from 'react';
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

const Sidebar: React.FC = () => {
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
              { icon: <Map size={18} />, label: 'Mapa Territorial', active: true },
              { icon: <MessageSquare size={18} />, label: 'Comunicaciones', active: false, badge: 2 },
              { icon: <Users size={18} />, label: 'Contactos', active: false },
              { icon: <Bell size={18} />, label: 'Alertas', active: false, badge: 3 },
              { icon: <AlertTriangle size={18} />, label: 'Incidentes', active: false },
              { icon: <Satellite size={18} />, label: 'Satélites', active: false, locked: true },
              { icon: <Radio size={18} />, label: 'Hidrófonos', active: false, locked: true },
              { icon: <Shield size={18} />, label: 'Seguridad', active: false, locked: true },
            ].map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center px-4 py-2 text-sm ${
                    item.active 
                      ? 'bg-holo-gold/10 text-holo-gold border-l-2 border-holo-gold' 
                      : 'text-holo-gray hover:bg-black/20'
                  }`}
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
                </a>
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
