import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { addTodoList } from '../../store/todo/todo.actions';
import { FormsModule } from '@angular/forms';
import { AuthState, User } from '@auth0/auth0-angular';
import { selectLoggedInUser } from '../../store/auth/auth.selectors';
import { first } from 'rxjs';
import { getId } from '../../utils';

@Component({
  selector: 'app-create-todo-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './create-todo-list.component.html',
  styleUrl: './create-todo-list.component.scss'
})
export class CreateTodoListComponent implements OnInit {
  newListTitle = '';
  authUser: User | null = null;
  constructor(
    private todoStore: Store<TodoState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.authStore.select(selectLoggedInUser)
    .pipe(first(user => !!user))
    .subscribe(user =>
      this.authUser = user
    );
  }

  createNewList() {
    if (this.newListTitle) {
      this.todoStore.dispatch(addTodoList({ 
        todoList: {
          title: this.newListTitle,
          id: getId(),
          owner: this.authUser?.email || ''
        }
      }));
    }
  }
}
