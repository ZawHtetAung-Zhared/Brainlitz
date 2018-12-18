import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCount'
})
export class GetObjectLength implements PipeTransform {

  transform(data) {
    var objLength;
    var temp = data;
    console.log(temp);
    for(let i = 0; i < temp.length; i++){
      // var xxx = temp[i-1]
      console.log('....' ,i);
      if(i != 0){
        var xxx = temp[i-1].count
        console.log(xxx)
        console.log(temp[i-1])
      }
      // objLength += xxx;
    }
    // console.log(objLength)

    return objLength;
  }

}