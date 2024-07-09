import { Injectable } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { login } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private authService: AuthService,
    private authState: Store<AuthState>
  ) { 
    this.authService.getAccessTokenSilently().subscribe((token) => {
      this.authState.dispatch(login({ token }));
      console.log('Access token: ', token);
    });
  }

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({ logoutParams: { returnTo: origin } })
  }
}
