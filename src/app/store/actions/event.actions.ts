import { createAction, props } from '@ngrx/store';
import { EventModel } from 'src/app/models/event.model';

import { EventActionsEnum } from './action.enums';

export const addEvent = createAction(
  EventActionsEnum.AddEvent,
  props<{ event: EventModel }>()
);

export const loadEvent = createAction(
  EventActionsEnum.LoadEvent,
  props<{ events: EventModel[] }>()
);
