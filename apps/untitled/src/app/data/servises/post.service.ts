import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDtoInterface,
  CommentInterface,
  PostCreateDtoInterface,
  PostInterface,
} from '../interfaces/post.iterface';
import { firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  posts = signal<PostInterface[]>([]);

  createPost(payload: PostCreateDtoInterface) {
    return this.#http
      .post<PostInterface>(`${this.baseApiUrl}post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPosts();
        })
      );
  }

  fetchPosts() {
    return firstValueFrom(
      this.#http
        .get<PostInterface[]>(`${this.baseApiUrl}post/`)
        .pipe(tap((res) => this.posts.set(res)))
    );
  }

  createComment(payload: CommentCreateDtoInterface) {
    return this.#http.post<CommentInterface>(
      `${this.baseApiUrl}comment/`,
      payload
    );
  }

  getCommentsBYPostId(postId: number) {
    return this.#http
      .get<PostInterface>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
