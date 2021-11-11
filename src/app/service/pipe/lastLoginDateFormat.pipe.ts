import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'lastLoginDateFormat'
})
export class lastLoginDateFormatPipe implements PipeTransform {
  transform(getDate) {
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
    var d = new Date(getDate);
    if (getDate) {
      if (moment(d).isSame(moment(), 'day')) {
        if (d.getUTCHours() > 3) {
          var date = moment(d).format('LT');
        } else {
          var date = moment(d)
            .startOf('day')
            .fromNow();
        }
        return date;
      } else if (
        moment(d)
          .add(1, 'days')
          .isSame(moment(), 'day')
      ) {
        return 'Yesterday';
      } else {
        var month = monthNames[d.getUTCMonth()];
        var year = d.getUTCFullYear();
        var date = d.getUTCDate();
        var dFormat = date + ' ' + month + ' ' + year;
        return dFormat;
      }
    } else {
      return '-';
    }
  }
}
