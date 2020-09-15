import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsInMemDataService implements InMemoryDbService {
  createDb() {
    let events: EventModel[] = [
      { id: 1, name: 'Event 1', address: 'USA, NY', date: '13 april' },
      { id: 2, name: 'Event 2', address: 'USA, CA', date: '14 april' },
      { id: 3, name: 'Event 3', address: 'USA, LS', date: '15 april' },
      { id: 4, name: 'Event 4', address: 'USA, DN', date: '16 april' },
      { id: 5, name: 'Event 5', address: 'USA, AL', date: '17 april' },
      { id: 6, name: 'Event 6', address: 'USA, Lvs', date: '18 april' },
      { id: 7, name: 'Event 7', address: 'USA, DC', date: '19 april' },
    ];
    return { events };
  }
}
