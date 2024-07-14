import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initialAppState, reducers } from './store/app.reducer';
import { metaReducers } from './store/logging.metareducer';
import { TodoEffects } from './store/todo/todo.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore( reducers, { initialState: initialAppState, metaReducers: metaReducers }),
    provideEffects(TodoEffects),
    provideHttpClient(),
    provideAuth0({
      domain: '',
      clientId: '',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideAnimationsAsync(),
]
};
