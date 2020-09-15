import { createSelector } from '@ngrx/store';

import { EventState, AppState } from '../states';

const selectEventsState = (state: AppState) => state.events;

export const selectEvents = createSelector(
  selectEventsState,
  (state: EventState) => state.events
);
