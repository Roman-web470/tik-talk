import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AvatarUploadingComponent } from '../../settings-page/avatar-uploading/avatar-uploading.component';
import { ProfileService } from '../../../data/servises/profile.service';
import {
  debounce,
  debounceTime,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AvatarUploadingComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.css',
})
export class ProfileFiltersComponent implements OnDestroy {
  profileService = inject(ProfileService);
  fb = inject(FormBuilder);
  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap((formValue) => {
          return this.profileService.filtersProfiles(formValue);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
