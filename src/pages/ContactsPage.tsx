
import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const ContactsPage = () => {
  return (
    <MainLayout>
      <div className="p-4 h-full">
        <h2 className="holo-title mb-4">Contactos</h2>
        
        <div className="h-full holo-monitor-border bg-black/80 rounded overflow-hidden p-4">
          <p className="text-holo-gray mb-4">
            Esta sección muestra sus contactos establecidos y permite buscar nuevos contactos para establecer comunicación.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="holo-panel">
              <h3 className="holo-subheading mb-2">Contactos Recientes</h3>
              <div className="space-y-2">
                <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                    JS
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">John Simmons</div>
                    <div className="text-xs text-holo-gray/70">CCPO - Air Force USA</div>
                  </div>
                </div>
                <div className="p-2 border border-holo-gold/30 rounded bg-black/50 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-holo-navy flex items-center justify-center text-holo-gold border border-holo-gold/30">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Jose Diaz</div>
                    <div className="text-xs text-holo-gray/70">C.C - Armada Mexico</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="holo-panel">
              <h3 className="holo-subheading mb-2">Buscar Nuevos Contactos</h3>
              <p className="text-xs text-holo-gray/70 mb-2">
                Busque contactos para establecer una conexión segura.
              </p>
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Nombre, cargo, organización..." 
                  className="holo-input w-full"
                />
              </div>
              <div className="text-center text-xs text-holo-gray/50">
                Ingrese términos de búsqueda para encontrar contactos
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactsPage;
