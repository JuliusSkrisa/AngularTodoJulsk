import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { Todo } from '../../models/todo';
import { addTodoList } from '../../store/todo/todo.actions';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

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
    CommonModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todoForm: FormGroup;
  listTitle = '';
  todoListItems: Todo[] = [];
  constructor(
    private fb: FormBuilder,
    private todoStore: Store<TodoState>
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      deadline: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.todoForm.pristine
    console.log(this.todoForm.value);
    //this.newTodoList.push(this.todoForm.value);
    this.todoForm.reset();
  }
}
