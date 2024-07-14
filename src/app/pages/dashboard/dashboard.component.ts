import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthButtonComponent } from '../../components/auth-button/auth-button.component';
import { AuthState } from '@auth0/auth0-angular';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreateTodoListComponent } from '../../components/create-todo-list/create-todo-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [    
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    AuthButtonComponent,
    CreateTodoListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  constructor(
    private authStore: Store<AuthState>
  ) {
    this.isAuthenticated$ = this.authStore.select(selectIsLoggedIn);
  }
  ngOnInit(): void {
  }
}
