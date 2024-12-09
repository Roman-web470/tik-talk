import { Component, input } from '@angular/core';
import { CommentInterface } from '../../../data/interfaces/post.iterface';
import { AvatarCircleComponent } from '../../../component-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { DateTransformPipe } from '../../../pipes/date-transform.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, DateTransformPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input<CommentInterface>();
}
