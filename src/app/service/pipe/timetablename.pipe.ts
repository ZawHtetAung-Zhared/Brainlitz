import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AMPM'
})
export class AmPmPipe implements PipeTransform {

  transform(time) {
  	var name;
    name = (time > 12) ? 'PM' : 'AM';
    console.log(name)
    return name;
  }
}