import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FormsModule } from '@angular/forms';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
	FormsModule
  ],
})
export class SettingsPageModule {}
