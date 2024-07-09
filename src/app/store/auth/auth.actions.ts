import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] login', props<{ token: string }>());
export const logout = createAction('[Auth] logout');