import {
  ActionReducerMap,
} from '@ngrx/store';
import { TodoState, todoReducer, initialState as todoInitialState } from './todo/todo.reducer';
import { AuthState, authReducer, initialState as authInitialState } from './auth/auth.reducer';

export interface AppState {
  todoState: TodoState,
  authState: AuthState
}

export const initialAppState: AppState = {
  todoState: todoInitialState,
  authState: authInitialState
}

export const reducers: ActionReducerMap<AppState> = {
  todoState: todoReducer,
  authState: authReducer
};
