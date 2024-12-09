import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from '../../../component-ui/svg-icon/svg-icon.component';
import { DndDirective } from '../../../component-ui/derectives/dnd.directive';

@Component({
  selector: 'app-avatar-uploading',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-uploading.component.html',
  styleUrl: './avatar-uploading.component.css',
})
export class AvatarUploadingComponent {
  preview = signal<string>('/assets/img/avatar-placeholder.png');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    this.processFile(file);
  }

  processFile(file: File | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);

    this.avatar = file;
  }
}
