export interface Todo {
    id: string;
    title: string;
    text: string;
    deadline: string;
    completed?: boolean;
}

export interface TodoList {
    id: string;
    title: string;
    todos?: Todo[];
    owner: string;
}