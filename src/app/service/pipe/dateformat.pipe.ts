import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(getDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
     var d = new Date(getDate);
     var month = monthNames[d.getUTCMonth()];
     var year = d.getUTCFullYear();
     var date = d.getUTCDate();
     console.log(date,month,year)
     var dFormat = date + ' ' + month + ' ' + year;
     console.log("DD MM YYYY",dFormat);
     return dFormat;
  }
}