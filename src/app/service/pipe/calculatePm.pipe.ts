import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculatePM'
})
export class calculatePMPipe implements PipeTransform {

  transform(timeObj) {
  	var hr;
    if(timeObj. meridiem == 'PM'){
    	if(timeObj.hr == 12){
    		hr = timeObj.hr;
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr + 12;
    	}
    }else if(timeObj. meridiem == 'AM'){
    	if(timeObj.hr == 12){
    		hr = 0;
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr;
    	}
    }
    return hr;
  }
}