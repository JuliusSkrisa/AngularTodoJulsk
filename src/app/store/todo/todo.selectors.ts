import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState, initialState } from './todo.reducer';

export const authState = createFeatureSelector<TodoState>('todoState');
export const selectTodoLists = createSelector(
    authState,
    (state: TodoState = initialState) => state.todoLists
);