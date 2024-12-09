import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '../../../../../component-ui/avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { SvgIconComponent } from '../../../../../component-ui/svg-icon/svg-icon.component';
import { MessageInterface } from '../../../../../data/interfaces/chats.interface';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    FormsModule,
    NgIf,
    SvgIconComponent,
    DatePipe,
  ],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.css',
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<MessageInterface>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
