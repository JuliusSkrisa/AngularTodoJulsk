import { createAction, props } from '@ngrx/store';
import { Todo, TodoList } from '../../models/todo';

export const addTodoList = createAction('[Todo] Add Todo list', props<{ title: string, id: string, todoList?: Todo[] }>());
export const loadTodoList = createAction('[Todo] Load Todo list', props<{ todoLists: TodoList[] }>());

export const error = createAction('[Todo] Error');