import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimeFormat'
})
export class ConvertTimeFormatPipe implements PipeTransform {

  transform(time: string) {
    let hour = Number(time.split(':'))[0]
    let min = Number(time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';

    // let newMin = min.length == 1 ? 0 + min : min;
    // console.log(newMin)
    // let newHour = hour > 12 ? hour - 12 : hour;
    // let hourFormat = min.length == 1 ? 0 + newHour : newHour;
    // let newFormat = newHour + ':' + newMin + ':' + part;
    // console.log(time)
    // return newFormat;
    // min = (min+'').length == 1 ? `0${min}` : min;
    // hour = hour > 12 ? hour - 12 : hour;
    // hour = (hour+'').length == 1 ? `0${hour}` : hour;
    // console.log('AM:PM',min,hour)
  }
}