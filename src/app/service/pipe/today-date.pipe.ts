import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'todayDate'
})
export class TodayDatePipe implements PipeTransform {
  transform(getDate): any {
    if (moment(getDate).isSame(moment(), 'day')) {
      var date = moment(getDate).format('D MMM YYYY');
      return 'Today, ' + date;
    } else {
      var date = moment(getDate).format('dddd, D MMM YYYY');
      return date;
    }
  }
}
