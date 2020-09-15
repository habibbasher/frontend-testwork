import { RouterReducerState } from '@ngrx/router-store';

import { initialEventState, EventState } from './event.state';

export interface AppState {
  router?: RouterReducerState;
  events: EventState;
}

export const initialAppState: AppState = {
  events: initialEventState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
