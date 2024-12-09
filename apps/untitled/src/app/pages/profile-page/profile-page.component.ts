import { Component, inject, signal } from '@angular/core';
import { ProfileHeaderComponent } from '../../component-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/servises/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SvgIconComponent } from '../../component-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../component-ui/subscriber-card/subscriber-card.component';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { PostInputComponent } from './post-input/post-input.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { ChatService } from '../../data/servises/chat.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    JsonPipe,
    PostInputComponent,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  chatService = inject(ChatService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  subscribers$ = this.profileService.getSubscribersShortList();
  me$ = toObservable(this.profileService.me);

  isMyPage = signal<boolean>(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(id: number) {
    firstValueFrom(this.chatService.createChat(id)).then((res) => {
      this.router.navigate(['/chat', res.id]);
    });
  }
}
