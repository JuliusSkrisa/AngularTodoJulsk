import { User } from '@auth0/auth0-angular';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] login', props<{ token: string, user?: User | null }>());
export const loginFailed = createAction('[Auth] login failed');
export const logout = createAction('[Auth] logout');