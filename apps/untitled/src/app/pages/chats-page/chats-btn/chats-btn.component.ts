import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../component-ui/avatar-circle/avatar-circle.component';
import {
  ChatInterface,
  LastMessageResInterface,
} from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.css',
})
export class ChatsBtnComponent {
  chat = input<LastMessageResInterface>();
}
