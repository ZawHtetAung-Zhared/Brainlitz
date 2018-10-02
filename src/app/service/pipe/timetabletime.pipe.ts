import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TTtime'
})
export class ttTimePipe implements PipeTransform {

  transform(time) {
  	var resultTime;
    resultTime = (time > 12) ? time - 12 : time;
    console.log(resultTime)
    return resultTime;
  }
}