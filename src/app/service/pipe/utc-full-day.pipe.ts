import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcFullDay'
})
export class UtcFullDayPipe implements PipeTransform {

  transform(getDate): any {
    let d=new Date(getDate).getDay();
    let fullDay;
    switch (d) {
      case 0:
      fullDay = "Sunday";
      break;
      case 1:
      fullDay = "Monday";
      break;
      case 2:
      fullDay = "Tuesday";
      break;
      case 3:
      fullDay = "Wednesday";
      break;
      case 4:
      fullDay = "Thursday";
      break;
      case 5:
      fullDay = "Friday";
      break;
      case  6:
      fullDay = "Saturday";
    }    
   return fullDay;
  }

}
