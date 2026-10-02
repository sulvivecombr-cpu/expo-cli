export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: 'me' | 'them';
}

export interface Conversation {
  id: string;
  name: string;
  avatarColor: string;
  messages: Message[];
  lastMessageTime: number;
  unreadCount: number;
}
