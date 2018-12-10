import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TTmonth'
})
export class ttMonthPipe implements PipeTransform {

  transform(getDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];    
    var mth = monthNames[getDate];
    // console.log(mth)
    return mth;
  }
}