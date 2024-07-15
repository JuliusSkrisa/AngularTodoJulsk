import { Injectable } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { combineLatest, filter, first, switchMap } from 'rxjs';

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
      filter(isAuthenticated => isAuthenticated),
      switchMap(() => combineLatest([this.authService.getAccessTokenSilently(), this.authService.user$.pipe(first(user => !!user))])),
    ).subscribe(([token, user]) => {
      this.authState.dispatch(login({ user, token }));
      });
  }

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({ logoutParams: { returnTo: origin } })
  }
}
