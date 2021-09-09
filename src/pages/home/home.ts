import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { WeatherProvider } from '../../providers/weather/weather';
import { NewsProvider } from '../../providers/news/news';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	weather: any[];
	main: any;
	country: any;
	city_name: string;
	units: any;
	totalResults: number;
	articles: any[];
	showNews: boolean;
	pages: number;
	myDate: any;
	buttonDisabled: boolean;



     
	constructor(public navCtrl: NavController, private wp: WeatherProvider, private storage: Storage, private news: NewsProvider, public http: HttpClient) {
		this.myDate = Date.now(); //displays current date
		this.showNews = false;
		this.buttonDisabled = false;

	}

	ionViewWillEnter() { // Fire off when componenet is loaded
		this.buttonDisabled = true; 
		this.storage.ready().then(async () => {  // To store location and unit entered by user
			this.city_name = await this.storage.get('city_name');
			this.units = await this.storage.get('units');
			if (this.city_name && this.units) {
				console.log(this.city_name, this.units);
				
				

				this.wp.getWeather(this.city_name, this.units).subscribe(data => { // gets the data for weatherProvider
					if (data) {
						console.log(data);
						this.buttonDisabled = false; // button enabled when valid city is entered
						this.city_name = data.name;
						this.weather = data.weather;
						this.main = data.main;
						this.country = data.sys.country;
						console.log(this.main);

						this.news.getNews(this.country).subscribe(res => { // gets the data for newsProvider when a valid location is entered
							console.log(res);
							this.articles=res.articles;
							this.totalResults=res.totalResults;
							this.showNews=true;
						 })
					}

				},
					error => { //To catch any error and invalid inputs.
						console.log(error);
						this.city_name = undefined;
						this.weather = undefined;
						this.main = undefined;
						this.country = undefined;

					}
				);
			}

		});
	}

	getNews(): Observable<any> {
		return this.http.get(`https://newsapi.org/v2/top-headlines?country=ie&pageSize=5&apiKey=12cac3bf2d8145ffb81009a20133b3b4`);
		
	}
	
    
	openSettings() {
		console.log("IN openSettingsPage testing...");
		this.navCtrl.push(SettingsPage); //To navigate to the settings page
		console.log("IN openSettingsPage function...");
	}


	openNews() {
		console.log("IN openNewsProvider testing...");
		this.news.getNews(this.country).subscribe(res => { // gets the data for newsProvider
			this.articles = res.articles;
			this.totalResults = res.totalResults;
			this.showNews = true;
		}
		)
		error => { //To catch any errors snd invalid inputs
			console.log(error);
			this.articles = undefined;
			this.totalResults = undefined;
			this.showNews = undefined;
			

		}
		console.log("IN openNewsProvider function...");

	}
}


	