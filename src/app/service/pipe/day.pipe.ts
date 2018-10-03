import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDay'
})
export class GetDayPipe implements PipeTransform {

  transform(sentday) {
  	var day=""
    let d = new Date(sentday.key);
    console.log(d)
    var weekday = d.getDay();
    console.log(sentday)
    console.log(weekday)
    switch (weekday) {
        case 0:
        day = "Sunday";
        break;
        case 1:
        day = "Monday";
        break;
        case 2:
        day = "Tuesday";
        break;
        case 3:
        day = "Wednesday";
        break;
        case 4:
        day = "Thursday";
        break;
        case 5:
        day = "Friday";
        break;
        case  6:
        day = "Saturday";
      }
     return day;
  }
}