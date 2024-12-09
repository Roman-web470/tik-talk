import { Component, input } from '@angular/core';
import { ProfileInterface } from '../../../../data/interfaces/profile.interface';
import { AvatarCircleComponent } from '../../../../component-ui/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-chat-worspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-worspace-header.component.html',
  styleUrl: './chat-worspace-header.component.css',
})
export class ChatWorspaceHeaderComponent {
  profile = input.required<ProfileInterface>();
}
