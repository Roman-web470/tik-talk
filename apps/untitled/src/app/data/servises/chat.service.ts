import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChatInterface,
  MessageInterface,
  LastMessageResInterface,
} from '../interfaces/chats.interface';
import { ProfileService } from './profile.service';
import { map } from 'rxjs';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  activeChatMessages = signal<MessageInterface[]>([]);
  baseUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseUrl}chat/`;
  messageUrl = `${this.baseUrl}message/`;

  createChat(userId: number) {
    return this.http.post<ChatInterface>(
      `${this.chatsUrl}${userId}`,
      userId,
      {}
    );
  }

  getMyChats() {
    return this.http.get<LastMessageResInterface[]>(
      `${this.chatsUrl}get_my_chats/`
    );
  }

  getChatById(chatId: number) {
    return this.http.get<ChatInterface>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companoin:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<MessageInterface>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
