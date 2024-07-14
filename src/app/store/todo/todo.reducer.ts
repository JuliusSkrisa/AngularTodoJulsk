
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from '../../models/todo';

export interface TodoState {
    todoLists: {
        todoItems: Todo[],
        id: string,
        title: string,
    }[]; 
}

export const initialState: TodoState = {
    todoLists: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.addTodoList, (state, { todoList, title, id }) => {
        const newTodoList = {
            todoItems: todoList ?? [],
            title,
            id
        };
        return { 
            ...state,
            todoLists: [...state.todoLists, newTodoList]
        }
    }),
    on(TodoActions.loadTodoList, (state, { todoLists }) => {
        return { 
            ...state,
            todoLists
        }
    }),
);