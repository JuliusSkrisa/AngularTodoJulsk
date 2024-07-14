import { Injectable } from '@angular/core';
import { AuthState, User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../store/auth/auth.selectors';
import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://668d7f02099db4c579f32904.mockapi.io/api/TodoLists';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  authUser: User | null = null;
  constructor(
    private authStore: Store<AuthState>,
    private http: HttpClient
  ) { 
    this.authStore.select(selectLoggedInUser)
      .pipe(first(user => !!user))
      .subscribe(user =>
        this.authUser = user
      );
  }


  saveNewList(title: string, id: string) {
    const body = { title, id, owner: this.authUser?.email };
    return this.http.post(API_URL, body)
  }

  loadUsersTodoLists() {
    const url = new URL(API_URL);
    if (this.authUser?.email) {
      url.searchParams.append('owner', this.authUser?.email);
    }
    return this.http.get(url.href);
  }
}
