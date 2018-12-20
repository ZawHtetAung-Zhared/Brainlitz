import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourToMin'
})
export class HourMinsPipe implements PipeTransform {

  transform(timeObj) {
    let mins = timeObj.hr * 60 + timeObj.min;
    return mins;
  }
}