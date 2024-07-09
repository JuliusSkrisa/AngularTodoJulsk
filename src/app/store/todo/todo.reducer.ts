
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from '../../models/todo';

export interface TodoState {
    todoList: Todo[];
}

export const initialState: TodoState = {
    todoList: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.addTodoItem, (state, { todo }) => ({ 
        ...state, todoList: [...state.todoList, todo]
    })),
);