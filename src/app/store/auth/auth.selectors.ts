import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, initialState } from './auth.reducer';

export const authState = createFeatureSelector<AuthState>('authState');
export const selectIsLoggedIn = createSelector(
    authState,
    (state: AuthState = initialState) => state.loggedIn
);
export const selectLoggedInUser = createSelector(
    authState,
    (state: AuthState = initialState) => state.user
);