import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timelineDay'
})
export class GetTimelineDayPipe implements PipeTransform {

  transform(day) {
    var temp = day;
    var resultDay;
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];
    temp = new Date(day).getUTCDay()
    resultDay = dayNames[temp];
      
    return resultDay;
  }
}