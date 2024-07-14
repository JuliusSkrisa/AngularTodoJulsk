export interface Todo {
    title: string;
    text: string;
    deadline: string;
    completed?: boolean;
}

export interface TodoList {
    title: string;
    id: string;
    todoItems: Todo[];
    owner: string;
}