import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '@auth0/auth0-angular';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(Store<AuthState>);
  const router = inject(Router);

  return authStore.select(selectIsLoggedIn).pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
