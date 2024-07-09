import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo';

export const addTodoItem = createAction('[User] Add Todo Item', props<{ todo: Todo }>());