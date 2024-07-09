import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { TodoState, todoReducer } from './todo/todo.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface State {
  todoState: TodoState,
  authState: AuthState
}

export const reducers: ActionReducerMap<State> = {
  todoState: todoReducer,
  authState: authReducer
};
