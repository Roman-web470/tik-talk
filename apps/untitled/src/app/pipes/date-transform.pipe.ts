import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
  standalone: true,
})
export class DateTransformPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) {
      return ''; // Если значение null или пустое
    }

    const date = new Date(value);
    const utc = new Date();
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    console.log(utc.getUTCHours());

    if (diffInSeconds < 60) {
      return `${diffInSeconds} секунд назад`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} минут назад`;
    }

    return new Date(value).toLocaleTimeString().substr(0, 9);
  }
}
