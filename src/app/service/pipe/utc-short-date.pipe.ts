import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcShortDate'
})
export class UtcShortDatePipe implements PipeTransform {
  
  transform(getDate): any {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];     
    let d=new Date(getDate).getDay();
    var monthName =  monthNames[new Date(getDate).getUTCMonth()];
    var utcShortDate =  new Date(getDate).getUTCDate() + ' ' + monthName;
    
    return utcShortDate;
  }
  
}
