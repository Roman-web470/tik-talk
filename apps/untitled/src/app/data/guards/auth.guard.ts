import { inject } from '@angular/core';
import { AuthService } from '../servises/auth.service';
import { Router } from '@angular/router';

export const canActivateAuth = () => {
  const isLogin = inject(AuthService).isAuth;

  if (isLogin) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
