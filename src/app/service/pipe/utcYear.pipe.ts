import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearFormat'
})
export class yearPipe implements PipeTransform {

  transform(date) {
    var year = new Date(date).getUTCFullYear();
    return year;
  }
}