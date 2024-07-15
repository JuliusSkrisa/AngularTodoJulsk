import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { authGuard } from './services/authentication/auth.guard';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'todo-list', component: TodoListComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent },
];