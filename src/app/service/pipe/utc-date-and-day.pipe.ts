import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { months, monthsShort } from 'moment';

@Pipe({
  name: 'utcDateAndDay'
})
export class UtcDateAndDayPipe implements PipeTransform {
  transform(getDate): any {
    let d = new Date(getDate).getUTCDay();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    let fullDay;
    switch (d) {
      case 0:
        fullDay = 'Sunday';
        break;
      case 1:
        fullDay = 'Monday';
        break;
      case 2:
        fullDay = 'Tuesday';
        break;
      case 3:
        fullDay = 'Wednesday';
        break;
      case 4:
        fullDay = 'Thursday';
        break;
      case 5:
        fullDay = 'Friday';
        break;
      case 6:
        fullDay = 'Saturday';
    }
    var monthName = monthNames[new Date(getDate).getUTCMonth()];
    var yearName = new Date(getDate).getUTCFullYear();
    var year = yearName.toString();
    var todayMonth = monthNames[new Date().getUTCMonth()];
    var todayYear = new Date().getUTCFullYear();
    var todayDate = new Date().getUTCDate();
    var utcDateAndDay;
    if (
      todayDate == new Date(getDate).getUTCDate() &&
      monthName == todayMonth &&
      yearName == todayYear
    ) {
      utcDateAndDay =
        'Today, ' +
        new Date(getDate).getUTCDate() +
        ' ' +
        monthName +
        ' ' +
        year;
    } else {
      utcDateAndDay =
        fullDay +
        ', ' +
        new Date(getDate).getUTCDate() +
        ' ' +
        monthName +
        ' ' +
        year;
    }
    return utcDateAndDay;
  }
}
