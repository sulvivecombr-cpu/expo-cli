import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Conversation } from '../types';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';

interface Props {
  conversation: Conversation;
  onBack: () => void;
  onSend: (text: string) => void;
}

function getInitials(name: string): string {
  const words = name.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function ChatScreen({ conversation, onBack, onSend }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [conversation.messages.length]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={[styles.avatar, { backgroundColor: conversation.avatarColor }]}>
          <Text style={styles.avatarText}>{getInitials(conversation.name)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{conversation.name}</Text>
          <Text style={styles.headerStatus}>online</Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
      >
        {conversation.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </ScrollView>
      <ChatInput onSend={onSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeae2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  headerStatus: {
    fontSize: 12,
    color: '#d4f4d0',
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: 10,
  },
});
