import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/services/data.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendar: Week[];

  constructor(private dateServ: DataService) {}

  ngOnInit(): void {
    this.dateServ.date.subscribe(this.generate);
  }

  generate(now: moment.Moment) {
    console.log(now.format());
  }
}
