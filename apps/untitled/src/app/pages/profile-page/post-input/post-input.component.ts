import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '../../../component-ui/avatar-circle/avatar-circle.component';
import { ProfileService } from '../../../data/servises/profile.service';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from '../../../component-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../data/servises/post.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    ImgUrlPipe,
    NgIf,
    SvgIconComponent,
    FormsModule,
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.css',
})
export class PostInputComponent {
  @Output() createPost = new EventEmitter<string>();
  @Output() createComment = new EventEmitter<string>();

  isCommentInput = input(false);
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;
  postService = inject(PostService);

  @HostBinding('class.comment')
  get isComment() {
    return;
  }

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto ');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  emitterValueChange() {
    this.isCommentInput()
      ? this.createComment.emit(this.postText)
      : this.createPost.emit(this.postText);
    this.postText = '';
  }
}
