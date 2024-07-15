import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '@auth0/auth0-angular';
import { selectIsLoggedIn } from './store/auth/auth.selectors';
import { MatButtonModule } from '@angular/material/button';
import { TodoListsCollectionComponent } from './components/todo-lists-collection/todo-lists-collection.component';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthButtonComponent,
    TodoListsCollectionComponent,
    AsyncPipe,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-todo';
  isAuthenticated$: Observable<boolean | undefined>;

  constructor(
    private authStore: Store<AuthState>,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.loadState();
    this.isAuthenticated$ = this.authStore.select(selectIsLoggedIn);
  }

  createNewList() {
    this.router.navigate(['']);
  }
}
