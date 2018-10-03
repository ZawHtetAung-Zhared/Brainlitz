import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log('hi filter', searchText)
  	console.log(typeof(searchText))
    if(!items) return [];
    if(!searchText) return items;
	searchText = searchText.toLowerCase();
  console.log(searchText);
	return items.filter( it => {
    console.log('', it)
      let xx = it.preferredName
      return xx.toLowerCase().includes(searchText);
    });
   }
}