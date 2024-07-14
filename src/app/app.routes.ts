import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
];