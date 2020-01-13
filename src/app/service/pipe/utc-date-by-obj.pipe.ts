import { Pipe, PipeTransform } from '@angular/core';
import { months, monthsShort } from 'moment';
@Pipe({
  name: 'utcDateByObj'
})
export class UtcDateByObjPipe implements PipeTransform {
  transform(getDate): any {
    console.warn(getDate.day.toString().length);
    console.warn(getDate);

    var monthName = monthsShort(getDate.month - 1);
    var yearName = getDate.year;
    var year = yearName.toString();
    var day =
      getDate.day.toString().length > 1 ? getDate.day : '0' + getDate.day;
    monthName;
    var utcDateAndDay =
      getDate.dayOfWeek + ', ' + day + ' ' + monthName + ' ' + year;
    return utcDateAndDay;
  }
}
