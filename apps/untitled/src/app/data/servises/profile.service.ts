import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from '../interfaces/profile.interface';
import { map, tap } from 'rxjs';
import { PagebleInterface } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  me = signal<ProfileInterface | null>(null);
  filteredProfiles = signal<ProfileInterface[]>([]);

  constructor() {}

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseApiUrl}account/subscribers/`
      )
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseApiUrl}account/${id}`);
  }

  getMe() {
    return this.http
      .get<ProfileInterface>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  subscribeAccount(id: number) {
    return this.http.get<ProfileInterface>(
      `${this.baseApiUrl}account/subscribe/${id}`
    );
  }

  pathProfile(profile: Partial<ProfileInterface>) {
    return this.http.patch<ProfileInterface>(
      `${this.baseApiUrl}account/me`,
      profile
    );
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<File>(`${this.baseApiUrl}account/upload_image`, fd);
  }

  filtersProfiles(params: Record<string, any>) {
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseApiUrl}account/accounts`,
        {
          params,
        }
      )
      .pipe(
        tap((res) => {
          this.filteredProfiles.set(res.items);
          console.log('res', res.items);
        })
      );
  }
}
