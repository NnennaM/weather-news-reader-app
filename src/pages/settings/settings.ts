import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
  */

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {
	units: string;
	text: string;
	city_name: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		
	}

	ionViewWillEnter() {
		console.log('ionViewDidLoad SettingsPage');
		this.storage.ready().then(() => {
			this.storage.get('city_name').then((val) => { 
				console.log(val);
				if (val != null) {
					this.city_name = val;
					
				} else {
					this.city_name = 'Galway', //default city 
						this.units = 'metric' //default unit
				}
			});
		});

	}

	
	savePage() {  

		switch (this.units) {
			case "standard":
				this.text = "standard";
				break;
			case "imperial":
				this.text = "imperial";
				break;
			default:
				this.text = "metric";
				break;
		}
		console.log('Save Units testing....');
		console.log(this.city_name, this.units);
		this.storage.set('city_name', this.city_name);
		this.storage.set('units', this.units);
		
	}
}

