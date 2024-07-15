import { Component } from '@angular/core';
import { AuthButtonComponent } from '../../components/auth-button/auth-button.component';
import { Store } from '@ngrx/store';
import { AuthState } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';
import { first } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthButtonComponent, MatProgressSpinnerModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = true;

  constructor(
    authStore: Store<AuthState>,
    router: Router,
    route: ActivatedRoute
  ) {
    authStore.select(selectIsLoggedIn)
      .pipe(first(isLoggedIn => isLoggedIn))
      .subscribe(isLoggedIn => {
        this.loading = false;
        if (isLoggedIn) {
          const returnUrl = route.snapshot.queryParams['returnUrl'] || '/';
          router.navigateByUrl(returnUrl); // Navigate to the original URL
        }
      });
  }
}
