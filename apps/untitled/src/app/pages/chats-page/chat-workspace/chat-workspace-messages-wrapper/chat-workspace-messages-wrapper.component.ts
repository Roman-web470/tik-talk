import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { MessageInputComponent } from '../../../../component-ui/message-input/message-input.component';
import { ChatService } from '../../../../data/servises/chat.service';
import {
  ChatInterface,
  MessageInterface,
} from '../../../../data/interfaces/chats.interface';
import { firstValueFrom, interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessagesComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.css',
})
export class ChatWorkspaceMessagesWrapperComponent implements OnInit {
  private subscriptionMessage!: Subscription;
  chatService = inject(ChatService);
  chat = input.required<ChatInterface>();
  messages = this.chatService.activeChatMessages;
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  @ViewChild('scroll__wrapper', { static: false }) scroll__wrapper!: ElementRef;

  constructor() {
    this.startMessagePolling();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  ngOnInit() {
    this.groupMessagesByDate();
  }

  ngOnDestroy(): void {
    if (this.subscriptionMessage) {
      this.subscriptionMessage.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.resizeFeed();
    this.scrollToBottom();
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatService.sendMessage(this.chat().id, messageText)
    );

    await firstValueFrom(this.chatService.getChatById(this.chat().id));
    console.log('qwfvfdvsdv', this.messages());

    this.scrollToBottom();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 16;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  private scrollToBottom(): void {
    const container = this.scroll__wrapper.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  private startMessagePolling() {
    this.subscriptionMessage = interval(10000)
      .pipe(switchMap(() => this.chatService.getChatById(this.chat().id)))
      .subscribe({
        next: (chat) => {
          this.messages.set(chat.messages);
        },
      });
  }

  private groupMessagesByDate() {
    const groupedLogs: {
      [date: string]: { date: string; logs: MessageInterface[] };
    } = {};
    Object.values(this.messages()).forEach((log) => {
      const date: string = log.createChatAt.substring(0, 10);
      groupedLogs[date] = groupedLogs[date] || { date, logs: [] };
      groupedLogs[date].logs.push(log);
    });

    const groupedArray: { date: string; logs: MessageInterface[] }[] =
      Object.values(groupedLogs);

    console.log(groupedLogs, groupedArray);
  }
}
