
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    loggedIn: boolean;
    token: string | null;
}

export const initialState: AuthState = {
    loggedIn: false,
    token: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { token }) => ({ 
        ...state,
        token,
        loggedIn: true
    })),
    on(AuthActions.logout, (state) => ({ 
        ...state,
        loggedIn: false,
        token: null
    })),
);