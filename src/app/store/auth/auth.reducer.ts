
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    loggedIn: boolean;
}

export const initialState: AuthState = {
    loggedIn: false,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { success }) => ({ 
        ...state, loggedIn: success
    })),
);