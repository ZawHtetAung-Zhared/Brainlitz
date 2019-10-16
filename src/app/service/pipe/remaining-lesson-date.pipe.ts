import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
@Pipe({
  name: 'remainingLessonDate'
})
export class RemainingLessonDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var date = moment(value).format('D MMM YYYY');
    return date;
  }
}
