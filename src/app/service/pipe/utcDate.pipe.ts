import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate'
})
export class GetUtcDatePipe implements PipeTransform {

  transform(getDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];    
    var monthName =  monthNames[new Date(getDate).getUTCMonth()];
    var utcDate = monthName + ' ' + new Date(getDate).getUTCDate() + ', ' + new Date(getDate).getUTCFullYear()
    // console.log(utcDate)
    return utcDate;
  }
}