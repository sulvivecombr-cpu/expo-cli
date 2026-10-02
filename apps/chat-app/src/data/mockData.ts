import { Conversation } from '../types';

const now = Date.now();
const min = 60 * 1000;
const hour = 60 * min;
const day = 24 * hour;

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Ana Silva',
    avatarColor: '#E91E63',
    unreadCount: 2,
    messages: [
      { id: '1-1', text: 'Oi! Tudo bem?', timestamp: now - 2 * hour, sender: 'them' },
      { id: '1-2', text: 'Tudo ótimo! E você?', timestamp: now - 2 * hour + 5 * min, sender: 'me' },
      { id: '1-3', text: 'Tudo certo! Queria te convidar para o jantar sexta', timestamp: now - 30 * min, sender: 'them' },
      { id: '1-4', text: 'Claro! Que horas?', timestamp: now - 25 * min, sender: 'me' },
      { id: '1-5', text: '19h no restaurante italiano do centro', timestamp: now - 5 * min, sender: 'them' },
    ],
    lastMessageTime: now - 5 * min,
  },
  {
    id: '2',
    name: 'Pedro Santos',
    avatarColor: '#2196F3',
    unreadCount: 0,
    messages: [
      { id: '2-1', text: 'Vamos marcar o cinema?', timestamp: now - 1 * day, sender: 'them' },
      { id: '2-2', text: 'Boa! Qual filme?', timestamp: now - 1 * day + 10 * min, sender: 'me' },
      { id: '2-3', text: 'O novo do Nolan, você quer?', timestamp: now - 1 * day + 15 * min, sender: 'them' },
      { id: '2-4', text: 'Com certeza! Sábado à noite?', timestamp: now - 1 * day + 20 * min, sender: 'me' },
      { id: '2-5', text: 'Perfeito, vou comprar os ingressos', timestamp: now - 23 * hour, sender: 'them' },
    ],
    lastMessageTime: now - 23 * hour,
  },
  {
    id: '3',
    name: 'Grupo da Família',
    avatarColor: '#4CAF50',
    unreadCount: 5,
    messages: [
      { id: '3-1', text: 'Mãe: Almoço de domingo confirmado!', timestamp: now - 3 * hour, sender: 'them' },
      { id: '3-2', text: 'Eu levo a sobremesa', timestamp: now - 3 * hour + 3 * min, sender: 'me' },
      { id: '3-3', text: 'Pai: Eu vou buscar a bebida', timestamp: now - 2 * hour, sender: 'them' },
      { id: '3-4', text: 'Que delícia, não vejo a hora!', timestamp: now - 2 * hour + 5 * min, sender: 'them' },
      { id: '3-5', text: 'Vou levar a neta também ❤️', timestamp: now - 45 * min, sender: 'them' },
    ],
    lastMessageTime: now - 45 * min,
  },
  {
    id: '4',
    name: 'Maria Oliveira',
    avatarColor: '#FF9800',
    unreadCount: 0,
    messages: [
      { id: '4-1', text: 'Obrigada pelo presente! Adorei!', timestamp: now - 2 * day, sender: 'them' },
      { id: '4-2', text: 'Imagina! Fico feliz que gostou 😊', timestamp: now - 2 * day + 10 * min, sender: 'me' },
    ],
    lastMessageTime: now - 2 * day,
  },
  {
    id: '5',
    name: 'Carlos Eduardo',
    avatarColor: '#9C27B0',
    unreadCount: 1,
    messages: [
      { id: '5-1', text: 'A reunião foi remarcada para amanhã às 10h', timestamp: now - 5 * hour, sender: 'them' },
      { id: '5-2', text: 'Recebido, obrigado por avisar', timestamp: now - 4 * hour, sender: 'me' },
      { id: '5-3', text: 'Vou enviar a apresentação atualizada hoje à noite', timestamp: now - 10 * min, sender: 'them' },
    ],
    lastMessageTime: now - 10 * min,
  },
  {
    id: '6',
    name: 'Júlia Costa',
    avatarColor: '#00BCD4',
    unreadCount: 0,
    messages: [
      { id: '6-1', text: 'Que viagem incrível! As fotos ficaram maravilhosas', timestamp: now - 3 * day, sender: 'me' },
      { id: '6-2', text: 'Muito obrigada! Foi uma experiência única', timestamp: now - 3 * day + 30 * min, sender: 'them' },
      { id: '6-3', text: 'Preciso contar tudo, vamos marcar um café?', timestamp: now - 3 * day + 35 * min, sender: 'them' },
    ],
    lastMessageTime: now - 3 * day + 35 * min,
  },
];
