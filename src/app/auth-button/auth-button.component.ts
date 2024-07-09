import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { AuthState } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatButtonModule],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})
export class AuthButtonComponent {
  origin = window.location.origin;
  isAuthenticated$: Observable<boolean>;
  constructor(
    private auth: AuthenticationService,
    private authStore: Store<AuthState>
  ) {
    this.isAuthenticated$ = this.authStore.select(selectIsLoggedIn);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
