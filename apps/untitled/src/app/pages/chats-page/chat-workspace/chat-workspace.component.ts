import { Component, inject } from '@angular/core';
import { ChatWorspaceHeaderComponent } from './chat-worspace-header/chat-worspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { MessageInputComponent } from '../../../component-ui/message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../data/servises/chat.service';
import { switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.css',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  chatsService = inject(ChatService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.chatsService.getChatById(id);
    })
  );
}
