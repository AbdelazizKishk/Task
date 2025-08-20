import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const id = inject(PLATFORM_ID);
  let Token: string | null = null;
  if (isPlatformBrowser(id)) {
    Token = localStorage.getItem('Token') || inject(AuthService).tokenKey;
  }

  if (Token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${Token}`,
      },
    });
  }

  return next(req);
};
