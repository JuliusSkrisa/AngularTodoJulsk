import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import * as AuthActions from '../auth/auth.actions';
import { TodoService } from '../../services/todo/todo.service';
import { of } from 'rxjs';
import { TodoList } from '../../models/todo';

@Injectable()
export class TodoEffects {
  uploadNewList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoList),
      exhaustMap(action =>
        this.todoService.saveNewList(action.title, action.id).pipe(
          map(response => console.log(response)),
          catchError(error => {
            console.log(error);
            return of(null);
          })
      ))
    ), { dispatch: false });

  loadExistingLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(() =>
        this.todoService.loadUsersTodoLists().pipe(
          map((response: any) => TodoActions.loadTodoList({ todoLists: response })),
          catchError(error => {
            console.log(error);
            return of( TodoActions.error);
          })
      ))
    ));

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}