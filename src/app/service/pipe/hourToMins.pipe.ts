import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourToMin'
})
export class HourMinsPipe implements PipeTransform {

  transform(timeObj) {
  	var hr;
    var mins;
  	if(timeObj. meridiem == 'PM'){
  		if(timeObj.hr == 12){
    		hr = timeObj.hr;
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr + 12;
    	}
    	mins = (hr * 60) + timeObj.min;
  	}else if(timeObj. meridiem == 'AM'){
    	if(timeObj.hr == 12){
    		hr = 0;
    	}else if(timeObj.hr <12){
    		hr = timeObj.hr;
    	}
    	mins = (hr * 60) + timeObj.min;
    }
    
    return mins;
  }
}