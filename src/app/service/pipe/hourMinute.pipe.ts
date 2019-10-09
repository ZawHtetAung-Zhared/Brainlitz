import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrMin'
})
export class HourMinutePipe implements PipeTransform {
  transform(mins: number): string {
    let h = Math.floor(mins / 60);
    var m = mins % 60;
    if (h == 0) {
      return m + 'min';
    } else if (m == 0) {
      return h + 'hr';
    } else {
      return h + 'hr ' + m + 'min';
    }
  }
}
