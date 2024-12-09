import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostService } from '../../../data/servises/post.service';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../../data/servises/profile.service';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css',
})
export class PostFeedComponent {
  postService = inject(PostService);
  profile = inject(ProfileService).me;
  feed = this.postService.posts;
  r2 = inject(Renderer2);

  hostElement = inject(ElementRef);

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    this.postService.fetchPosts();
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 16;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreate(text: string) {
    if (!text) return;

    firstValueFrom(
      this.postService.createPost({
        title: 'post',
        content: text,
        authorId: this.profile()!.id,
      })
    );
  }
}
