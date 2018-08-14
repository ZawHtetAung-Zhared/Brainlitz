import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(mins: number): string {
    let h = Math.floor( mins / 60);
    var m = mins % 60;
    if(h == 0){
    	return m + 'minutes';
    }else if(m == 0){
    	return h + 'h';
    }else{
    	return h + 'h ' + m + 'minutes';
    }
  }
}