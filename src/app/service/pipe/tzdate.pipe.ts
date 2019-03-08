import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'timezoneDate'
})
export class TZDatePipe implements PipeTransform {
  transform(getDate) {
    const zone = localStorage.getItem('timezone');
    const format = 'DD MMM YYYY';
    var temp = new Date(getDate);
    var tzD = moment(temp,format).tz(zone).format(format);
    return tzD;
  }
}