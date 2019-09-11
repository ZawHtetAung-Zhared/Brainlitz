import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { months, monthsShort } from 'moment';

@Pipe({
  name: 'utcDateAndDay'
})
export class UtcDateAndDayPipe implements PipeTransform {
  transform(getDate): any {
    // if (true) {
    //   console.error(monthsShort(getDate.month-1))
    //   getDate = moment(getDate).format('YYYY-MM-DD');
    //   console.error(getDate)
    //   console.error(new Date(getDate).getUTCMonth());

    // }

    let d = new Date(getDate.month);
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
    // switch (d) {
    //   case 0:
    //     fullDay = 'Sun';
    //     break;
    //   case 1:
    //     fullDay = 'Mon';
    //     break;
    //   case 2:
    //     fullDay = 'Tue';
    //     break;
    //   case 3:
    //     fullDay = 'Wed';
    //     break;
    //   case 4:
    //     fullDay = 'Thu';
    //     break;
    //   case 5:
    //     fullDay = 'Fri';
    //     break;
    //   case 6:
    //     fullDay = 'Sat';
    // }

    var monthName = monthsShort(getDate.month - 1);
    var yearName = getDate.year;
    var year = yearName.toString();
    monthName;
    var utcDateAndDay =
      getDate.dayOfWeek + ', ' + getDate.day + ' ' + monthName + ' ' + year;
    return utcDateAndDay;
  }
}
