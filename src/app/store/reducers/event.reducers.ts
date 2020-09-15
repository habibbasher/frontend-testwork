import { createReducer, on } from '@ngrx/store';

import { EventActions } from '../actions';
import { EventState } from '../states';

export const initialEventState: EventState = {
  events: [],
};

export const eventReducers = createReducer(
  initialEventState,

  on(EventActions.addEvent, (state, action) => {
    return {
      events: [...state.events, action.event],
    };
  }),

  on(EventActions.loadEvent, (state, action) => {
    return {
      events: [...action.events],
    };
  })
);
