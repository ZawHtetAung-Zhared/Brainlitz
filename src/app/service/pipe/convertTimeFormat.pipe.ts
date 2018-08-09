import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimeFormat'
})
export class ConvertTimeFormatPipe implements PipeTransform {

  transform(time: string) {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = Number(hour) > 12 ? ' PM' : ' AM';

    let newMin = min.length == 1 ? 0 + min : min;
    let newHour = Number(hour) > 12 ? Number(hour) - 12 : Number(hour);
    let newFormat = newHour + ':' + newMin + '' + part;
    return newFormat;
  }
}