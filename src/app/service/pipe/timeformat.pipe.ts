import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class GetFormatData implements PipeTransform {

  transform(val) {
    var formatData;
    if(val != null){
      // console.log(val)
      // console.log('...', val.toString().length)
      if(val == 0){
        formatData = '00';
      }else if(val.toString().length == 1){
        formatData = '0' + val;
      }else{
        formatData = val;
      }
    }
    
    
    return formatData;
  }
}