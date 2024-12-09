import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostService } from '../../../data/servises/post.service';
import {
  CommentInterface,
  PostInterface,
} from '../../../data/interfaces/post.iterface';
import { AvatarCircleComponent } from '../../../component-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../component-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from '../comment/comment.component';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../../data/servises/profile.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  post = input<PostInterface>();
  comment = signal<CommentInterface[]>([]);
  postService = inject(PostService);
  profile = inject(ProfileService).me;

  async ngOnInit() {
    this.comment.set(this.post()!.comments);
  }

  async onCreated(text: string) {
    firstValueFrom(
      this.postService.createComment({
        text: text,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    );

    const comments = await firstValueFrom(
      this.postService.getCommentsBYPostId(this.post()!.id)
    );
    this.comment.set(comments);
  }
}
