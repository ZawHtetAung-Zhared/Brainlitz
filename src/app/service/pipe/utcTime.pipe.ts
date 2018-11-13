import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcTime'
})
export class GetUtcTimePipe implements PipeTransform {

  transform(getDate) {
    var time;    
    var utcString1 = new Date(getDate).getUTCHours();
    var utcString2 = new Date(getDate).getUTCMinutes();
    var utcString3 = new Date(getDate).getUTCSeconds();
    
    if(utcString1 >= 12){
      if(utcString1 == 12){
         utcString1 = 12;
      }else{
          utcString1 = utcString1 - 12;
      }
      time = 'PM'
    }else{
      time = 'AM'
    }
    
    var utcTime;
    if(utcString2 == 0){
  	  utcTime = utcString1 + ':' + utcString2 + '0 ' + time;
    }else{
      utcTime = (utcString2 >= 10) ? utcString1 + ':' + utcString2 + ' ' + time : utcString1 + ':' + '0' + utcString2 + ' ' + time;
    }
    
    return utcTime;
  }
}