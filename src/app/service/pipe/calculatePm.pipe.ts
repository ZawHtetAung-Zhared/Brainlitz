import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculatePM'
})
export class calculatePMPipe implements PipeTransform {

  transform(timeObj) {
  	console.log(timeObj);
  	var hr;
    if(timeObj. meridiem == 'PM'){
    	console.log("PM");
    	if(timeObj.hr == 12){
    		hr = timeObj.hr;
    		console.log("PM ==12")
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr + 12;
    		console.log("PM !=12")
    	}
    }else if(timeObj. meridiem == 'AM'){
    	console.log("AM");
    	if(timeObj.hr == 12){
    		hr = 0;
    		console.log("AM ==12")
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr;
    		console.log("AM !=12")
    	}
    }
    console.log(hr)
    return hr;
  }
}