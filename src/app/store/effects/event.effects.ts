import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EventActions } from '../actions';

@Injectable()
export class EventEffects {
  addEvent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.addEvent),
        tap((action) => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
