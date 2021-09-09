import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the NewsProvider provider.
*/
@Injectable()
export class NewsProvider {
  newsApiKey ="12cac3bf2d8145ffb81009a20133b3b4";
  



  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }
    //following function takes country as an input
    getNews(country: string): Observable<any> { //gets news stories of specified country
      const countryName = country.toLowerCase()
      return this.http.get(`https://newsapi.org/v2/top-headlines?country=${countryName}&pageSize=5&apiKey=${this.newsApiKey}`);
    
  }
}
