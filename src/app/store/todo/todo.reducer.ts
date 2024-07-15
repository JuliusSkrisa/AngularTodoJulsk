
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo, TodoList } from '../../models/todo';

export interface TodoState {
    todoLists: TodoList[]; 
}

export const initialState: TodoState = {
    todoLists: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.addTodoList, (state, { todoList }) => {
        const newTodoList = {
            todos: todoList.todos ?? [],
            title: todoList.title,
            owner: todoList.owner,
            id: todoList.id
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
    on(TodoActions.updateTodoList, (state, { todoList }) => {
        const index = state.todoLists.findIndex(list => list.id === todoList.id);
        const updatedTodoLists = [...state.todoLists];

        if (index !== -1) {
            updatedTodoLists[index] = todoList;
        }
        return {
            ...state,
            todoLists: updatedTodoLists
        }
    }),

    
);