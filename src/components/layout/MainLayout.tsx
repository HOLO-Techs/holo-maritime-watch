
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { WindowProvider } from '../../contexts/WindowContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <WindowProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </WindowProvider>
  );
};

export default MainLayout;
