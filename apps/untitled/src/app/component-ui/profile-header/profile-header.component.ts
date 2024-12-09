import { Component, input } from '@angular/core';
import { ProfileInterface } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent {
  profile = input<ProfileInterface>();
  constructor() {
    console.log('this.profile', this.profile);
  }
}
