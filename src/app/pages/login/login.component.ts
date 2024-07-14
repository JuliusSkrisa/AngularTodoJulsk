import { Component } from '@angular/core';
import { AuthButtonComponent } from '../../components/auth-button/auth-button.component';
import { Store } from '@ngrx/store';
import { AuthState } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    authStore: Store<AuthState>,
    router: Router
  ) {
    authStore.select(selectIsLoggedIn)
      .pipe(first(isLoggedIn => isLoggedIn))
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          router.navigate(['']);
        }
      });
  }
}
