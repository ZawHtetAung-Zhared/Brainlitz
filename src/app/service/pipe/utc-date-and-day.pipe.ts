import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'utcDateAndDay'
})
export class UtcDateAndDayPipe implements PipeTransform {
  transform(getDate): any {
    if (true) {
      getDate = moment(getDate).format('YYYY-MM-DD');
      // console.warn(getDate)
    }

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
        fullDay = 'Sun';
        break;
      case 1:
        fullDay = 'Mon';
        break;
      case 2:
        fullDay = 'Tue';
        break;
      case 3:
        fullDay = 'Wed';
        break;
      case 4:
        fullDay = 'Thu';
        break;
      case 5:
        fullDay = 'Fri';
        break;
      case 6:
        fullDay = 'Sat';
    }
    var monthName = monthNames[new Date(getDate).getUTCMonth()];
    var yearName = new Date(getDate).getUTCFullYear();
    var year = yearName.toString();
    monthName;
    var utcDateAndDay =
      fullDay +
      ', ' +
      new Date(getDate).getUTCDate() +
      ' ' +
      monthName +
      ' ' +
      year;
    return utcDateAndDay;
  }
}
