import { Observable } from 'rxjs';

import { EventModel } from '../models/event.model';

export abstract class EventsService {
  eventsUrl = 'api/events';

  abstract getEvents(): Observable<EventModel[]>;
  abstract getEvent(id: number): Observable<EventModel>;
  abstract addEvent(
    name: string,
    address: string,
    date: string
  ): Observable<EventModel>;
  abstract deleteEvent(event: EventModel | number): Observable<EventModel>;
  abstract searchEvent(term: string): Observable<EventModel[]>;
  abstract updateEvent(event: EventModel): Observable<EventModel>;
}
