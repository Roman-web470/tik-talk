import { ProfileInterface } from './profile.interface';

export interface ChatInterface {
  id: 0;
  userFirst: ProfileInterface;
  userSecond: ProfileInterface;
  messages: MessageInterface[];
  companion?: ProfileInterface;
}

export interface MessageInterface {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createChatAt: string;
  isRead: boolean;
  updatedAt: string;
  user?: ProfileInterface;
  isMine?: boolean;
}

export interface MessagesGroupByDateInterface {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createChatAt: string;
  isRead: boolean;
  updatedAt: string;
  user?: ProfileInterface;
  isMine?: boolean;
}

export interface LastMessageResInterface {
  id: number;
  userFrom: ProfileInterface;
  message: string;
  createdAt: string;
  unreadMessages: number;
}
