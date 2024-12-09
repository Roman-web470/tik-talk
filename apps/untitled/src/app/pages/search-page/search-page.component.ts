import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../component-ui/profile-card/profile-card.component';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../data/servises/profile.service';
import { ProfileInterface } from '../../data/interfaces/profile.interface';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    RouterOutlet,
    ProfileFiltersComponent,
    AsyncPipe,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
}
