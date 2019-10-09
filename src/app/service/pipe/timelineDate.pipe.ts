import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timelineDate'
})
export class GetTimelineDatePipe implements PipeTransform {
  transform(date) {
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
    var monthName = monthNames[new Date(date).getUTCMonth()];
    var timeDate = new Date(date).getUTCDate() + ' ' + monthName;
    // console.log(utcDate)
    return timeDate;
  }
}
