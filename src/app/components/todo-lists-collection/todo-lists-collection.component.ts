import { Component, OnDestroy } from '@angular/core';
import { TodoState } from '../../store/todo/todo.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectTodoLists } from '../../store/todo/todo.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TodoList } from '../../models/todo';
import { ActivatedRoute, Router } from '@angular/router';

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
export class TodoListsCollectionComponent implements OnDestroy{
  todoLists$: Observable<TodoList[]>;
  queryParams$: Subscription;
  selectedTodoListId: string = '';

  constructor(
    private todoStore: Store<TodoState>,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.todoLists$ = this.todoStore.select(selectTodoLists);
    this.queryParams$ = route.queryParams.subscribe(params => {
      this.selectedTodoListId = params['id'];
    })
  }

  openTodoListDetail(todoList: TodoList) {
    this.router.navigate(['/todo-list'], { queryParams: { id: todoList.id } });
  }

  ngOnDestroy(): void {
    this.queryParams$.unsubscribe();
  }
}
