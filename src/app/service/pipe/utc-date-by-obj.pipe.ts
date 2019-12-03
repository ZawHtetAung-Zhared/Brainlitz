import { Pipe, PipeTransform } from '@angular/core';
import { months, monthsShort } from 'moment';
@Pipe({
  name: 'utcDateByObj'
})
export class UtcDateByObjPipe implements PipeTransform {
  transform(getDate): any {
    var monthName = monthsShort(getDate.month - 1);
    var yearName = getDate.year;
    var year = yearName.toString();
    monthName;
    var utcDateAndDay =
      getDate.dayOfWeek +
      ', ' +
      '0' +
      getDate.day.slice(-2) +
      ' ' +
      monthName +
      ' ' +
      year;
    return utcDateAndDay;
  }
}
