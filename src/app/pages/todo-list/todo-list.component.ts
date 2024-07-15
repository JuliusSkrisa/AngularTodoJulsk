import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { Todo, TodoList } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { updateTodoList } from '../../store/todo/todo.actions';
import { selectTodoLists } from '../../store/todo/todo.selectors';
import { Subscription, map, switchMap } from 'rxjs';
import cloneDeep from 'lodash.clonedeep';
import { MatIconModule } from '@angular/material/icon';
import { getId } from '../../utils';
import { ListFilterSearchComponent } from '../../components/list-filter-search/list-filter-search.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    ListFilterSearchComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnDestroy {
  newTodoForm: FormGroup;
  todoList: TodoList | null = null;
  todoList$: Subscription;
  showNewTodoForm = false;

  constructor(
    private fb: FormBuilder,
    private todoStore: Store<TodoState>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.newTodoForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      deadlineTime: ['09:00', Validators.required]
    });

    this.todoList$ = this.activatedRoute.queryParams.pipe(
        switchMap((params) => this.todoStore.select(selectTodoLists).pipe(map(todoLists => todoLists.find(todoList => todoList.id === params['id']))),)
      ).subscribe(todoList => {
        if (todoList) {
          this.todoList = cloneDeep(todoList);
        }
      });
   }

  ngOnDestroy(): void {
    if (this.todoList$) {
      this.todoList$.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.newTodoForm.valid) {
      let deadline = new Date(this.newTodoForm.value.deadlineDate);
      const time = this.newTodoForm.value.deadlineTime.split(':');
      deadline.setHours(time[0], time[1], 0, 0);
  
      console.log(this.newTodoForm.value);
      if (this.todoList) {
        if (!this.todoList?.todos) {
          this.todoList.todos = [];
        }
        this.todoList?.todos.push({
          ...this.newTodoForm.value,
          deadline: deadline.toISOString(),
          id: getId(),
        });
        this.newTodoForm.reset();
        this.newTodoForm.value.deadlineTime = '09:00';
        this.showNewTodoForm = false;
      }
    }
  }

  saveList(): void {
    this.todoStore.dispatch(updateTodoList({ todoList: this.todoList as TodoList }));
    console.log('Saving list', this.todoList);
  }

  onTodoStatusChange(todo: Todo): void {
    todo.completed = !todo.completed;
  } 

  deleteTodo(id: string) {
    if (this.todoList && this.todoList.todos) {
      this.todoList.todos = this.todoList?.todos?.filter(todo => todo.id !== id);
    }
  }
}
