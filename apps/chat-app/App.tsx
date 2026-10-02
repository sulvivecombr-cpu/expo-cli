import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatScreen from './src/screens/ChatScreen';
import { conversations as initialConversations } from './src/data/mockData';
import { Message } from './src/types';

export default function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  const handleSend = (text: string) => {
    if (!activeChatId) return;
    const newMessage: Message = {
      id: `${Date.now()}`,
      text,
      timestamp: Date.now(),
      sender: 'me',
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMessage], lastMessageTime: Date.now() }
          : c
      )
    );
  };

  if (activeConversation) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <ChatScreen
          conversation={activeConversation}
          onBack={() => setActiveChatId(null)}
          onSend={handleSend}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ChatListScreen conversations={conversations} onOpenChat={setActiveChatId} />
    </>
  );
}
