import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { ProfileService } from '../../data/servises/profile.service';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, NgIf, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto ');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreate() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
