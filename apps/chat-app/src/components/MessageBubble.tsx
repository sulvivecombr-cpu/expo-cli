import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';

interface Props {
  message: Message;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export default function MessageBubble({ message }: Props) {
  const isMe = message.sender === 'me';
  return (
    <View style={[styles.container, isMe ? styles.containerMe : styles.containerThem]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={styles.text}>{message.text}</Text>
        <Text style={[styles.time, isMe ? styles.timeMe : styles.timeThem]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 2,
  },
  containerMe: {
    justifyContent: 'flex-end',
  },
  containerThem: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bubbleMe: {
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: 2,
  },
  bubbleThem: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 2,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  time: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'right',
  },
  timeMe: {
    color: '#667781',
  },
  timeThem: {
    color: '#999',
  },
});
