import { Component } from '@angular/core';
import {
	GlobalService,
} from '../../providers/providers';
import { NavController } from '@ionic/angular';
@Component({
	selector: 'app-info',
	templateUrl: 'info.page.html',
	styleUrls: ['info.page.scss'],
})
export class InfoPage {
	buildVersion: string;
	appVersion: string;
    constructor (
    	private rootScope: GlobalService,
    	public navCtrl: NavController,
	) {
	}
	shareApp(){
		this.rootScope.shareApp();
	}
	ionViewDidEnter(){
		this.buildVersion = this.rootScope.getGitVersion();
		this.appVersion = this.rootScope.getAppVersion();
	}
	goHome(){
		this.navCtrl.navigateRoot('reports');
	}
}
