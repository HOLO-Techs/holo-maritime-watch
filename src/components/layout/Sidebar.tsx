
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
  Lock,
  Inbox,
  Send,
  UserPlus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatInterface from '../chat/ChatInterface';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [contactsDialogOpen, setContactsDialogOpen] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState<'chat' | 'contacts'>('chat');
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const openChatDialog = () => {
    setActiveChatTab('chat');
    setChatDialogOpen(true);
  };

  const openContactsDialog = () => {
    setActiveChatTab('contacts');
    setChatDialogOpen(true);
  };

  return (
    <>
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
                { 
                  icon: <MessageSquare size={18} />, 
                  label: 'Comunicaciones', 
                  isDropdown: true,
                  active: currentPath === '/chat',
                  badge: 2,
                  subItems: [
                    { icon: <Inbox size={16} />, label: 'Chats', action: openChatDialog },
                    { icon: <UserPlus size={16} />, label: 'Contactos', action: openContactsDialog },
                    { icon: <Send size={16} />, label: 'Enviar Mensaje', action: () => navigate('/chat') }
                  ]
                },
                { icon: <Bell size={18} />, label: 'Alertas', path: '/alerts', active: currentPath === '/alerts', badge: 3 },
                { icon: <AlertTriangle size={18} />, label: 'Incidentes', path: '/incidents', active: currentPath === '/incidents' },
                { icon: <Satellite size={18} />, label: 'Satélites', path: '/satellites', active: currentPath === '/satellites', locked: true },
                { icon: <Radio size={18} />, label: 'Hidrófonos', path: '/hydrophones', active: currentPath === '/hydrophones', locked: true },
                { icon: <Shield size={18} />, label: 'Seguridad', path: '/security', active: currentPath === '/security', locked: true },
              ].map((item, index) => (
                <li key={index}>
                  {item.isDropdown ? (
                    <div className="space-y-1">
                      <button 
                        className={`flex items-center w-full px-4 py-2 text-sm ${
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
                      </button>
                      <div className="pl-9 space-y-1">
                        {item.subItems?.map((subItem, subIndex) => (
                          <button
                            key={`subitem-${subIndex}`}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-holo-gray hover:bg-black/20 rounded-md"
                            onClick={subItem.action}
                          >
                            <span className="mr-2">{subItem.icon}</span>
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button 
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        item.active 
                          ? 'bg-holo-gold/10 text-holo-gold border-l-2 border-holo-gold' 
                          : 'text-holo-gray hover:bg-black/20'
                      }`}
                      onClick={() => !item.locked && handleNavigation(item.path as string)}
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
                  )}
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

      {/* Chat/Contacts Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="bg-black border border-holo-gold/50 text-holo-gray max-w-4xl max-h-[80vh] p-0">
          <div className="flex flex-col h-[80vh]">
            <div className="flex border-b border-holo-gold/30">
              <button 
                className={`flex-1 py-3 px-4 text-center ${activeChatTab === 'chat' ? 'text-holo-gold bg-holo-gold/10' : 'text-holo-gray hover:bg-black/20'}`}
                onClick={() => setActiveChatTab('chat')}
              >
                <MessageSquare className="inline-block mr-2" size={18} />
                Comunicaciones
              </button>
              <button 
                className={`flex-1 py-3 px-4 text-center ${activeChatTab === 'contacts' ? 'text-holo-gold bg-holo-gold/10' : 'text-holo-gray hover:bg-black/20'}`}
                onClick={() => setActiveChatTab('contacts')}
              >
                <Users className="inline-block mr-2" size={18} />
                Contactos
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {activeChatTab === 'chat' ? (
                <div className="h-full p-4">
                  <ChatInterface />
                </div>
              ) : (
                <div className="h-full p-4 overflow-y-auto">
                  <h3 className="holo-subheading mb-4">Contactos Establecidos</h3>
                  <div className="space-y-2 mb-6">
                    <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                        JS
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">John Simmons</div>
                        <div className="text-xs text-holo-gray/70">CCPO - Air Force USA</div>
                      </div>
                      <button className="p-1.5 rounded bg-holo-gold/10 text-holo-gold hover:bg-holo-gold/20">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                    <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                        JD
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Jose Diaz</div>
                        <div className="text-xs text-holo-gray/70">C.C - Armada Mexico</div>
                      </div>
                      <button className="p-1.5 rounded bg-holo-gold/10 text-holo-gold hover:bg-holo-gold/20">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="holo-subheading mb-4">Buscar Nuevos Contactos</h3>
                  <div className="relative mb-4">
                    <input 
                      type="text" 
                      placeholder="Nombre, cargo, organización..." 
                      className="holo-input w-full"
                    />
                  </div>
                  <div className="text-center text-xs text-holo-gray/50 mb-4">
                    Ingrese términos de búsqueda para encontrar contactos
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
