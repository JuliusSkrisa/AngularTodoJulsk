import { Injectable } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { login, loginFailed } from '../../store/auth/auth.actions';
import { combineLatest, first, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private authService: AuthService,
    private authState: Store<AuthState>
  ) { 
  }

  loadState() {
    this.authService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return combineLatest([this.authService.getAccessTokenSilently(), this.authService.user$.pipe(first(user => !!user))])
        } else {
          return of([null, null]);
        }
      }),
      first()
    ).subscribe(([token, user]) => {
      if (user && token) {
        this.authState.dispatch(login({ user, token }));
      } else {
        this.authState.dispatch(loginFailed());
      }
    });
  }

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({ logoutParams: { returnTo: window.location.origin + window.location.pathname } })
  }
}
