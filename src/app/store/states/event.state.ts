import { EventModel } from 'src/app/models/event.model';

export interface EventState {
  events: EventModel[];
}

export const initialEventState: EventState = {
  events: [],
};
