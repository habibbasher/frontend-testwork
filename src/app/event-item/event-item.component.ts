import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  constructor() {}

  @Input() name: string;
  @Input() address: string;
  @Input() date: string;

  ngOnInit(): void {}
}
