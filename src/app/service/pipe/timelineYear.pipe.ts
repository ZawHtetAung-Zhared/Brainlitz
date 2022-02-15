import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timelineYear'
})
export class GetTimelineYearPipe implements PipeTransform {
  transform(date) {
    var year = new Date(date).getUTCFullYear();
    console.log('timelineYear', year);
    return year;
  }
}
