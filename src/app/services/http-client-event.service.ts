import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EventsService } from './event.service';
import { EventModel } from '../models/event.model';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpClientEventService extends EventsService {
  constructor(private http: HttpClient) {
    super();
  }

  getEvents(): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(this.eventsUrl)
      .pipe(catchError(this.handleError));
  }

  // get by id - will 404 when id not found
  getEvent(id: number): Observable<EventModel> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<EventModel>(url).pipe(catchError(this.handleError));
  }

  addEvent(
    name: string,
    address: string,
    date: string
  ): Observable<EventModel> {
    const event = { name, address, date };

    return this.http
      .post<EventModel>(this.eventsUrl, event, cudOptions)
      .pipe(catchError(this.handleError));
  }

  deleteEvent(event: number | EventModel): Observable<EventModel> {
    const id = typeof Event === 'number' ? event : event['id'];
    const url = `${this.eventsUrl}/${id}`;

    return this.http
      .delete<EventModel>(url, cudOptions)
      .pipe(catchError(this.handleError));
  }

  searchEvent(term: string): Observable<EventModel[]> {
    term = term.trim();
    // add safe, encoded search parameter if term is present
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http
      .get<EventModel[]>(this.eventsUrl, options)
      .pipe(catchError(this.handleError));
  }

  updateEvent(event: EventModel): Observable<EventModel> {
    return this.http
      .put<EventModel>(this.eventsUrl, event, cudOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
