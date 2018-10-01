import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TTday'
})
export class ttDayPipe implements PipeTransform {

  transform(day) {
    var temp = day;
    var resultDay;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const dayNames1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    if(day.length > 1){
      temp = new Date(day).getUTCDay()
      resultDay = dayNames1[temp];
    }else{
      resultDay = dayNames[temp];
    }    
    return resultDay;
  }
}