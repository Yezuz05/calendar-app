import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calendar app';
  dates = ['2018-01-21', '2018-01-05', '2018-02-25', '2018-02-20', '2018-01-20', '2018-03-25', '2018-04-10'];
}
