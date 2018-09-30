import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TTday'
})
export class ttDayPipe implements PipeTransform {

  transform(day, month) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    console.log('day~~~ ', day)
    console.log('month~~~ ', month)
    var resultDay = dayNames[day];
  	var resultMonth = monthNames[month];
    
    return resultDay;
  }
}