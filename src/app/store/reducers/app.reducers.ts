import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { AppState } from '../states';
import { eventReducers } from './event.reducers';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  events: eventReducers,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state: ', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
