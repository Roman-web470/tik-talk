import { Component, Input } from '@angular/core';
import { ProfileInterface } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink, SvgIconComponent],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.css',
})
export class SubscriberCardComponent {
  @Input() profile!: ProfileInterface;
}
