import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate'
})
export class GetDatePipe implements PipeTransform {

  transform(getDate) {
    var time;
    var utcString1 = new Date(getDate).getUTCHours();
    var utcString2 = new Date(getDate).getUTCMinutes();
    var utcString3 = new Date(getDate).getUTCSeconds();
    
    if(utcString1 > 12){
      utcString1 = utcString1 - 12;
      time = 'PM'
    }else{
      time = 'AM'
    }
    
    var utcDate;
    if(utcString2 == 0){
  	  utcDate = utcString1 + ':' + utcString2 + '0 ' + time;
    }else{
      utcDate = utcString1 + ':' + utcString2 + ' ' + time;
    }
    
    return utcDate;
  }
}