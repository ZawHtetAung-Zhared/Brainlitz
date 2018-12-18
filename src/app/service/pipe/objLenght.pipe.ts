import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCount'
})
export class GetObjectLength implements PipeTransform {

  transform(data) {
    var objLength;
    var temp = data;
    console.log(temp);
    for(let i = 1; i <= temp.length; i++){
      // var xxx = temp[i-1]
      if(i != 1){
        var xxx = temp[i-1].count
        console.log(temp[i-1])
      }
      // objLength += xxx;
    }
    // console.log(objLength)

    return objLength;
  }

}