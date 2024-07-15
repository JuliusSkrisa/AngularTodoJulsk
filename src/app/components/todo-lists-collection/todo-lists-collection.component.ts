import { Component, OnInit } from '@angular/core';
import { TodoState } from '../../store/todo/todo.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTodoLists } from '../../store/todo/todo.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TodoList } from '../../models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-lists-collection',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatListModule
  ],
  templateUrl: './todo-lists-collection.component.html',
  styleUrl: './todo-lists-collection.component.scss'
})
export class TodoListsCollectionComponent {
  todoLists$: Observable<TodoList[]>;
  constructor(
    private todoStore: Store<TodoState>,
    private router: Router
  ) {
    this.todoLists$ = this.todoStore.select(selectTodoLists);
  }

  openTodoListDetail(todoList: TodoList) {
    this.router.navigate(['/todo-list'], { queryParams: { id: todoList.id } });
  }
}
