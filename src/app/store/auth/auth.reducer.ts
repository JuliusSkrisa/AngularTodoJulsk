
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@auth0/auth0-angular';

export interface AuthState {
    loggedIn?: boolean;
    user: User | null;
    token: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { token, user }) => ({ 
        ...state,
        token,
        user: user ?? null,
        loggedIn: true
    })),
    on(AuthActions.logout, (state) => ({ 
        ...state,
        loggedIn: false,
        token: null
    })),
    on(AuthActions.loginFailed, (state) => ({ 
        ...state,
        loggedIn: false,
        token: null
    })),
);