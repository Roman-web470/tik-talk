import { Component, inject, Input } from '@angular/core';
import { ProfileInterface } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { PagebleInterface } from '../../data/interfaces/pageble.interface';
import { ProfileService } from '../../data/servises/profile.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent {
  @Input() profile!: ProfileInterface;

  profileService = inject(ProfileService);
  router = inject(Router);

  subscribe(profileId: number) {
    this.profileService.subscribeAccount(profileId);
    this.router.navigate(['profile/me']);
  }
}
