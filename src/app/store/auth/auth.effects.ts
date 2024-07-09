import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TodoActions from './auth.actions';
/*
@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(action =>
        this.userService.getUser(action.userId).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}*/