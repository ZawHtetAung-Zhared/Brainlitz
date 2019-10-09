import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { retry } from 'rxjs/operator/retry';
@Pipe({
  name: 'lessonDuration'
})
export class LessonDurationPipe implements PipeTransform {
  transform(duration: any): string {
    let h, m, s;
    let res;
    if (duration.startDate != undefined || duration.endDate != undefined) {
      let diff =
        new Date(duration.endDate).getTime() -
        new Date(duration.startDate).getTime();

      h = Math.floor(diff / 1000 / 60 / 60);
      m = Math.floor((diff / 1000 / 60 / 60 - h) * 60);

      // h = h < 10 ? '0' + h : h;
      // m = m < 10 ? '0' + m : m;

      if (m == '00') {
        res = h + 'hr duration';
      } else if (h == '00') {
        res = m + 'min duration';
      } else {
        res = h + 'hr ' + m + 'min duration';
      }
    } else {
      res = '';
    }

    return res;
  }
}
