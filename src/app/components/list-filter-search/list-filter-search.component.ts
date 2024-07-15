import { Component, Input } from '@angular/core';
import { Todo, TodoList } from '../../models/todo';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-filter-search',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    DatePipe,
    FormsModule
  ],
  templateUrl: './list-filter-search.component.html',
  styleUrl: './list-filter-search.component.scss'
})
export class ListFilterSearchComponent {
  @Input() todoList: TodoList | null = null;
  showCompleted: boolean = false;
  showActive: boolean = false;
  searchText: string = '';

  onTodoStatusChange(todo: Todo): void {
    todo.completed = !todo.completed;
  } 

  deleteTodo(id: string) {
    if (this.todoList && this.todoList.todos) {
      this.todoList.todos = this.todoList?.todos?.filter(todo => todo.id !== id);
    }
  }

  get filteredTodos() {
      return this.todoList?.todos?.filter(todo => {
        const matchesSearchText = todo.title.toLowerCase().includes(this.searchText.toLowerCase());
        const isCompleted = todo.completed;
        const isActive = new Date(todo.deadline) > new Date();
        
        return matchesSearchText && 
               (!this.showCompleted || isCompleted) && 
               (!this.showActive || isActive);
      });
    }
}
