import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public date: BehaviorSubject<moment.Moment | any> = new BehaviorSubject(
    moment()
  );
  constructor() {}

  changeMonth(dir: number) {
    const value = this.date.value.add(dir, 'month');

    this.date.next(value);
  }
}