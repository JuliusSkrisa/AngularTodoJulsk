import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Store } from '@ngrx/store';
import { AuthState, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { selectIsLoggedIn, selectLoggedInUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})
export class AuthButtonComponent {
  origin = window.location.origin;
  isAuthenticated$: Observable<boolean | undefined>;
  user$: Observable<User | null>;

  constructor(
    private auth: AuthenticationService,
    private authStore: Store<AuthState>
  ) {
    this.isAuthenticated$ = this.authStore.select(selectIsLoggedIn);
    this.user$ = this.authStore.select(selectLoggedInUser);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
