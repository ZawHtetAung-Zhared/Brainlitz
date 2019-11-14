import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'todayDate2'
})
export class UtcDateAndDayObjPipe implements PipeTransform {
  transform(getDate): any {
    var date = moment(getDate).format('dddd, D MMM YYYY');
    return date;
  }
}
