import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/states';

import { EventModel } from '../models/event.model';
import { HttpClientEventService } from '../services/http-client-event.service';
import { EventActions } from '../store/actions';
import { selectEvents } from '../store/selectors/event.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public events$: Observable<EventModel[]>;

  constructor(
    private router: Router,
    private eventService: HttpClientEventService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService
      .getEvents()
      .pipe(
        tap((res) => {
          this.store.dispatch(EventActions.loadEvent({ events: res }));
        })
      )
      .subscribe();
    this.events$ = this.store.pipe(select(selectEvents));
  }

  goToCreateNewEvent() {
    this.router.navigateByUrl('/create-event');
  }
}
