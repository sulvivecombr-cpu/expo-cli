import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Conversation } from '../types';

interface Props {
  conversations: Conversation[];
  onOpenChat: (id: string) => void;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  if (now.getTime() - timestamp < dayMs && date.getDate() === now.getDate()) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  if (now.getTime() - timestamp < 2 * dayMs) return 'Ontem';
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function getInitials(name: string): string {
  const words = name.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function ChatListScreen({ conversations, onOpenChat }: Props) {
  const sorted = [...conversations].sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversas</Text>
      </View>
      <ScrollView style={styles.list}>
        {sorted.map((conv) => {
          const lastMessage = conv.messages[conv.messages.length - 1];
          return (
            <TouchableOpacity
              key={conv.id}
              style={styles.chatItem}
              onPress={() => onOpenChat(conv.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.avatar, { backgroundColor: conv.avatarColor }]}>
                <Text style={styles.avatarText}>{getInitials(conv.name)}</Text>
              </View>
              <View style={styles.chatInfo}>
                <View style={styles.chatRow}>
                  <Text style={styles.chatName} numberOfLines={1}>{conv.name}</Text>
                  <Text style={styles.chatTime}>{formatTime(conv.lastMessageTime)}</Text>
                </View>
                <View style={styles.chatRow}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage.sender === 'me' ? 'Você: ' : ''}
                    {lastMessage.text}
                  </Text>
                  {conv.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conv.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#128C7E',
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginTop: 2,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
