import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attandanceDay'
})
export class attandanceDayPipe implements PipeTransform {

  transform(day) {
    var temp = day;
    var resultDay;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    temp = new Date(day).getUTCDay()
    resultDay = dayNames[temp];
       
    return resultDay;
  }
}