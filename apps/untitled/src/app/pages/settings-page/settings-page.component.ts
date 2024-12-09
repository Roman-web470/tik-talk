import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../component-ui/profile-header/profile-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../data/servises/profile.service';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadingComponent } from './avatar-uploading/avatar-uploading.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadingComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileServise = inject(ProfileService);

  @ViewChild(AvatarUploadingComponent)
  avatarUploader!: AvatarUploadingComponent;

  form = this.fb.group({
    firstName: [{ value: '' }, Validators.required],
    lastName: [{ value: '' }, Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: ['', Validators.required],
    stack: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileServise.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileServise.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileServise.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    //@ts-ignore
    firstValueFrom(
      this.profileServise.pathProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (Array.isArray(stack)) return stack;
    if (!stack) return [];

    return stack.split(',');
  }

  mergeStack(stack: string[] | null | string[] | undefined) {
    if (Array.isArray(stack)) return stack.join(',');
    if (!stack) return '';

    return stack;
  }
}
