
import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Contact {
  id: number;
  name: string;
  role: string;
  organization: string;
  lastMessage?: string;
  unread?: boolean;
  selected?: boolean;
}

const contacts: Contact[] = [
  { id: 1, name: "John Simmons", role: "CCPO", organization: "Air Force USA", lastMessage: "Reporte enviado", unread: false },
  { id: 2, name: "Jose Diaz", role: "C.C", organization: "Armada Mexico", lastMessage: "Enviando reporte encriptado...", unread: true },
];

// Generate 25 fictional contacts for the Colombian Navy
const colombianContacts: Contact[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 3,
  name: [
    "Carlos Jimenez", "Maria Lopez", "Fernando Gutiérrez", "Ana Valencia", "Rodrigo Martínez",
    "Valentina Santos", "Diego Herrera", "Laura Gómez", "Andrés Morales", "Catalina Rojas",
    "Javier Ochoa", "Camila Torres", "Santiago Vargas", "Isabella Osorio", "Mateo Castro",
    "Gabriela Rendon", "Daniel Quintero", "Sofia Cárdenas", "Nicolas Mendoza", "Valeria Duque",
    "Juan Estrada", "Manuela Rivera", "David Zuluaga", "Mariana Ortiz", "Luis Pérez"
  ][i],
  role: "C.C",
  organization: "Armada Colombia"
}));

// Combine both contact lists
const allContacts = [...contacts, ...colombianContacts];

interface Message {
  id: number;
  contactId: number;
  text: string;
  timestamp: string;
  isIncoming: boolean;
  isEncrypted?: boolean;
}

const ChatInterface: React.FC = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  const initialMessages: Record<number, Message[]> = {
    1: [
      { id: 1, contactId: 1, text: "Reporte enviado", timestamp: "19:45", isIncoming: true },
      { id: 2, contactId: 1, text: "Copy", timestamp: "19:46", isIncoming: false },
    ],
    2: [
      { id: 3, contactId: 2, text: "Enviando reporte encriptado...", timestamp: "19:48", isIncoming: true, isEncrypted: true },
    ]
  };
  
  const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  
  const handleContactSelect = (contact: Contact) => {
    // For the demo contacts with conversations, open the chat
    if (contact.id === 1 || contact.id === 2) {
      setActiveContact(contact);
    } else {
      // For all other contacts, show the connect modal
      setSelectedContact(contact);
      setShowConnectModal(true);
    }
  };
  
  const handleSendMessage = () => {
    if (!activeContact || !newMessage.trim()) return;
    
    const contactMessages = messages[activeContact.id] || [];
    const newMsg: Message = {
      id: (contactMessages[contactMessages.length - 1]?.id || 0) + 1,
      contactId: activeContact.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      isIncoming: false
    };
    
    setMessages({
      ...messages,
      [activeContact.id]: [...contactMessages, newMsg]
    });
    
    setNewMessage("");
  };
  
  const handleSendConnect = () => {
    setShowConnectModal(false);
  };
  
  const filteredContacts = allContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full holo-monitor-border bg-black/80 rounded overflow-hidden">
      {/* Contact List */}
      <div className="w-72 border-r border-holo-gold/30 flex flex-col">
        <div className="p-3 border-b border-holo-gold/30">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-holo-gray/50" />
            <input 
              type="text" 
              placeholder="Buscar contactos..." 
              className="holo-input w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  activeContact?.id === contact.id 
                    ? 'bg-holo-gold/20 border border-holo-gold/50' 
                    : 'hover:bg-black/50 border border-transparent'
                }`}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm truncate">{contact.name}</div>
                      {contact.unread && (
                        <div className="w-2 h-2 bg-holo-gold rounded-full"></div>
                      )}
                    </div>
                    <div className="text-xs text-holo-gray/70 flex items-center gap-1">
                      <span>{contact.role}</span>
                      <span className="text-holo-gray/40">•</span>
                      <span className="truncate">{contact.organization}</span>
                    </div>
                  </div>
                </div>
                {contact.lastMessage && (
                  <div className="mt-1 text-xs text-holo-gray/60 truncate pl-10">
                    {contact.lastMessage}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeContact ? (
          <>
            <div className="p-3 border-b border-holo-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                  {activeContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-sm">{activeContact.name}</div>
                  <div className="text-xs text-holo-gray/70">
                    {activeContact.role} - {activeContact.organization}
                  </div>
                </div>
              </div>
              <div className="text-xs text-holo-gold">Canal Seguro</div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages[activeContact.id]?.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isIncoming ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-2 rounded-md ${
                        message.isIncoming 
                          ? 'bg-holo-navy/80 border border-holo-gold/20' 
                          : 'bg-holo-gold/20 border border-holo-gold/30'
                      } ${message.isEncrypted ? 'backdrop-blur-sm' : ''}`}
                    >
                      {message.isEncrypted ? (
                        <div onClick={() => alert("La visualización de reportes encriptados no está disponible para las versiones Demo")}>
                          <div className="text-holo-gold font-mono text-sm blur-sm hover:blur-md select-none cursor-not-allowed">
                            {Array.from({ length: 15 }, () => "█".repeat(Math.floor(Math.random() * 10) + 5)).join("\n")}
                          </div>
                          <div className="mt-1 text-xs text-right text-holo-gold/50 italic">
                            Reporte encriptado - Clic para opciones
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm">{message.text}</div>
                          <div className="text-right text-xs text-holo-gray/50 mt-1">{message.timestamp}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t border-holo-gold/30">
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="holo-input flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="holo-button px-3"
                  onClick={handleSendMessage}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-holo-gold text-lg mb-2">Comunicaciones</div>
              <p className="text-holo-gray/70 max-w-xs">
                Selecciona un contacto para iniciar una conversación o ver mensajes existentes.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Connection Request Modal */}
      {showConnectModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-black border border-holo-gold/50 rounded-md p-4 w-96">
            <h3 className="text-holo-gold text-lg mb-4">Solicitar Conexión</h3>
            
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30 text-lg">
                {selectedContact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium">{selectedContact.name}</div>
                <div className="text-sm text-holo-gray/70">
                  {selectedContact.role} - {selectedContact.organization}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="holo-label block mb-1">Mensaje de Solicitud</label>
              <textarea 
                className="holo-input w-full h-24"
                placeholder="Escribe un mensaje de presentación..."
                defaultValue={`Saludos, soy Operador de Sistema HOLO. Solicito conectar para compartir información sobre alerta crítica en cable submarino.`}
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 rounded bg-holo-gray/20 text-holo-gray hover:bg-holo-gray/30 transition-colors"
                onClick={() => setShowConnectModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="holo-button"
                onClick={handleSendConnect}
              >
                Enviar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
