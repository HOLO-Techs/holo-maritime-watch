
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatInterface from '../components/chat/ChatInterface';

const ChatPage = () => {
  return (
    <MainLayout>
      <div className="p-4 h-full">
        <h2 className="holo-title mb-4">Comunicaciones</h2>
        <div className="h-[calc(100%-40px)]">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
