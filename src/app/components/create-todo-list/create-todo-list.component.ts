import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { addTodoList } from '../../store/todo/todo.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-todo-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './create-todo-list.component.html',
  styleUrl: './create-todo-list.component.scss'
})
export class CreateTodoListComponent {
  newListTitle = '';
  constructor(
    private todoStore: Store<TodoState>
  ) {}

  createNewList() {
    if (this.newListTitle) {
      this.todoStore.dispatch(addTodoList({title: this.newListTitle, id: Math.random().toString(36).substring(7)}));
    }
  }
}
