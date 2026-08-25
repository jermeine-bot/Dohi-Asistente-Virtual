export type MessageSender = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  isTyping?: boolean;
  suggestions?: string[];
}
