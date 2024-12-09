import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './component-ui/profile-card/profile-card.component';
import { JsonPipe } from '@angular/common';
import { SvgIconComponent } from './component-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, SvgIconComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
