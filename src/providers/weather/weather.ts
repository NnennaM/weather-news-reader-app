import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  'rxjs/add/operator/map'


@Injectable()
export class WeatherProvider {
     apiKey ="94805cf7f4a4ef065e55657fc6920348";
	 url;
	
  constructor(public http: HttpClient) {
	  
    console.log('Hello WeatherProvider Provider');
	this.url='http://api.openweathermap.org/data/2.5/weather?q=';
	this.apiKey ='94805cf7f4a4ef065e55657fc6920348';
  }
  
	  
      //Following function takes city and unit as an input
	  getWeather(city_name: string, units: string): Observable<any> { //Fetching data from api
	   return this.http.get(`${this.url}${city_name}&units=${units}&appid=${this.apiKey}`);
       
	  }
	  
	  
	  } 
  

  
