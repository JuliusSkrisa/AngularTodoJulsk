import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs';
import { selectToken } from '../../store/auth/auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(Store<AuthState>);

  return authStore.select(selectToken)
  .pipe(
    first(),
    switchMap(token => {
      if (token) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);

      } else {
        // no token 
        return next(req);
      }
    })
  );
};
