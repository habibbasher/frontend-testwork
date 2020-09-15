import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClientEventService } from '../services/http-client-event.service';
import { AppState } from '../store/states';
import { EventActions } from '../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  createEventForm: FormGroup;

  isLoading = false;
  isSubmitted = false;
  isShowPreview = false;
  name: string;
  address: string;
  date: string;
  customPatterns = {
    '0': { pattern: new RegExp('[a-z]') },
    '1': { pattern: new RegExp('[0-3]') },
    '2': { pattern: new RegExp('[0-9]') },
    '3': { pattern: new RegExp('[A-Z]') },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eventService: HttpClientEventService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
    this.onChanges();
  }

  initializeLoginForm() {
    this.createEventForm = this.fb.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      date: [null, Validators.required],
    });
  }

  onChanges(): void {
    this.createEventForm.get('name').valueChanges.subscribe((val) => {
      this.name = val;
      if (this.name.length > 0) this.isShowPreview = true;
    });
    this.createEventForm.get('address').valueChanges.subscribe((val) => {
      this.address = val;
      if (this.address.length > 0) this.isShowPreview = true;
    });
    this.createEventForm.get('date').valueChanges.subscribe((val) => {
      if (val.length > 2) {
        const date = val.slice(0, 2);
        const month = val.slice(2);
        this.date = date + ' ' + month;
      } else {
        this.date = val;
      }
      if (this.date.length > 0) this.isShowPreview = true;
    });
  }

  onSubmitEventForm() {
    this.isSubmitted = true;
    if (!this.createEventForm.valid) {
      return;
    }
    const { name, address } = this.createEventForm.value;
    this.eventService
      .addEvent(name, address, this.date)
      .pipe(
        tap((res) => {
          this.store.dispatch(EventActions.addEvent({ event: res }));
        })
      )
      .subscribe();
  }

  onClickBack() {
    this.router.navigateByUrl('/home');
  }
}
