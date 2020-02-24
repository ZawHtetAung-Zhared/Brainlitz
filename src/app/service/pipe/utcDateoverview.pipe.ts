import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDateoverview'
})
export class GetUtcDateoverviewPipe implements PipeTransform {
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
    var monthName = monthNames[new Date(getDate).getUTCMonth()];
    var yearName = new Date(getDate).getUTCFullYear();
    var year = yearName.toString();
    var utcDate = new Date(getDate).getUTCDate() + ' ' + monthName + ' ' + year;
    // console.log(utcDate)
    return utcDate;
  }
}
