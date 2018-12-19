import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twentyFour'
})
export class TwentyFourPipe implements PipeTransform {

  transform(timeObj) {
  	console.log(timeObj)
  }
}