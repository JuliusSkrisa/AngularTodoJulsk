import { Component } from '@angular/core';
import { CreateTodoListComponent } from '../../components/create-todo-list/create-todo-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [    
    CreateTodoListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
