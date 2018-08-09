import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDays'
})
export class WeekDaysPipe implements PipeTransform {
  transform(arr){
    let day="";
    let dayArr=[];
    let newArr=[];
    let newday:string="";
    let d:string='';
    let weekDays="SunMonTueWedThuFriSat";
    // let weekDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case 0:
        day = "Sun";
        break;
        case 1:
        day = "Mon";
        break;
        case 2:
        day = "Tue";
        break;
        case 3:
        day = "Wed";
        break;
        case 4:
        day = "Thu";
        break;
        case 5:
        day = "Fri";
        break;
        case  6:
        day = "Sat";
      }
      dayArr.push(day) 
    }

    for (var i = 0; i < dayArr.length; i++) {
      d += dayArr[i];
    }

    if(dayArr.length ==1){
      return dayArr;
    }else if (dayArr.length < 5) {
      for(let i = 0; i < dayArr.length - 1; i++ ){
        newday += dayArr[i]+',';
      }
      newday += dayArr[dayArr.length-1]
      // console.log("newday",newday)
      newArr.push(newday);
      return newArr;
    }else if((dayArr.length >= 5 )&& (weekDays.includes(d))){
      newday = dayArr[0] + " to " + dayArr[dayArr.length - 1];
      newArr.push(newday);
      // console.log("ARR",newArr)
      return newArr;
    }else if((dayArr.length >= 5 )&& (!weekDays.includes(d))){ 
      for(let i = 0; i < dayArr.length - 1; i++ ){
        newday += dayArr[i]+',';
      }
      newday += dayArr[dayArr.length-1]
      // console.log("newday",newday)
      newArr.push(newday);
      return newArr;
    }
    
  }
}