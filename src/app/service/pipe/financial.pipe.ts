import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financial'
})
export class FinancialPipe implements PipeTransform {
  transform(x): any {
    return Number.parseFloat(x).toFixed(2);
  }
}
