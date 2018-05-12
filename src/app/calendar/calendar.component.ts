import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() dates;
  year = moment().year();
  year2 = moment().year();
  month = moment().month();
  month2 = moment().month() + 1;
  cal1 = {
    month_days: null,
    month_name: null,
    month_empty_days: null,
    month_events: []
  };
  cal2 = {
    month_days: null,
    month_name: null,
    month_empty_days: null,
    month_events: []
  };
  constructor() { }

  ngOnInit() {
    this.emptyDays();
    this.getDays();
    this.getEvents();
  }
  getDays() {
    const daysInMonth1 = moment({years: this.year, months: this.month}).daysInMonth();
    const month1 = moment({years: this.year, months: this.month}).format('MMMM');
    const daysInMonth2 = moment({years: this.year2, months: this.month2}).daysInMonth();
    const month2 = moment({years: this.year2, months: this.month2}).format('MMMM');
    let days = [];
    for (let i = 1; i <= daysInMonth1; i++) {
      days.push(i);
    }
    this.cal1.month_days = days;
    this.cal1.month_name = month1;
    days = [];
    for (let i = 1; i <= daysInMonth2; i++) {
      days.push(i);
    }
    this.cal2.month_days = days;
    this.cal2.month_name = month2;
  }
  getEvents() {
    this.cal1.month_events = [];
    this.cal2.month_events = [];
    this.dates.forEach(date => {
      if (moment({year: this.year, month: this.month}).isSame(date, 'month')) {
        const event = moment(date).date();
        this.cal1.month_events.push(event);
      }
      if (moment({year: this.year2, month: this.month2}).isSame(date, 'month')) {
        const event = moment(date).date();
        this.cal2.month_events.push(event);
      }
    });
  }
  hasEvent(day) {
    if (day.cal === 1) {
      return this.cal1.month_events.includes(day.day);
    } else if (day.cal === 2) {
      return this.cal2.month_events.includes(day.day);
    }
  }
  emptyDays() {
    const startday1 = moment({years: this.year, months: this.month}).date(1).weekday();
    const empty_days1 = new Array(startday1);
    this.cal1.month_empty_days = empty_days1;
    const startday2 = moment({years: this.year2, months: this.month2}).date(1).weekday();
    const empty_days2 = new Array(startday2);
    this.cal2.month_empty_days = empty_days2;
  }
  forward() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    if (this.month2 === 11) {
      this.month2 = 0;
      this.year2++;
    } else {
      this.month2++;
    }
    this.emptyDays();
    this.getDays();
    this.getEvents();
  }
  backward() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    if (this.month2 === 0) {
      this.month2 = 11;
      this.year2--;
    } else {
      this.month2--;
    }
    this.emptyDays();
    this.getDays();
    this.getEvents();
  }
}
