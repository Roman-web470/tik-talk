import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../interfaces/auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  cookeService: CookieService = inject(CookieService);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';
  token: string | null = null;
  refreshToken: string | null = null;

  constructor() {}

  get isAuth() {
    if (!this.token) {
      this.token = this.cookeService.get('token');
      this.refreshToken = this.cookeService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, fd)
      .pipe(tap((token) => this.saveToken(token)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => this.saveToken(val)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    this.cookeService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['login']);
  }

  saveToken(token: TokenResponse) {
    this.token = token.access_token;
    this.refreshToken = token.refresh_token;

    this.cookeService.set('token', this.token);
    this.cookeService.set('refreshToken', this.refreshToken);
  }
}
