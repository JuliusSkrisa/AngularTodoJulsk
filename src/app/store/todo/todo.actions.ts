import { createAction, props } from '@ngrx/store';
import { Todo, TodoList } from '../../models/todo';

export const addTodoList = createAction('[Todo] Add Todo list', props<{ todoList: TodoList }>());
export const updateTodoList = createAction('[Todo] Update Todo list', props<{ todoList: TodoList }>());
export const loadTodoList = createAction('[Todo] Load Todo list', props<{ todoLists: TodoList[] }>());

export const error = createAction('[Todo] Error');