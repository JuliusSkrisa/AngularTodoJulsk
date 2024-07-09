// logging.meta-reducer.ts

import { ActionReducer, MetaReducer } from '@ngrx/store';

// Define a function that logs actions and state
export function loggingMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state before:', state);
    console.log('action:', action);

    return reducer(state, action);
  };
}

// Export a meta-reducer array for easy addition to the StoreModule
export const metaReducers: MetaReducer<any>[] = [loggingMetaReducer];