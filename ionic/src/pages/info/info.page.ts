import { Component } from '@angular/core';
import {
	GlobalService,
} from '../../providers/providers';
@Component({
	selector: 'app-info',
	templateUrl: 'info.page.html',
	styleUrls: ['info.page.scss'],
})
export class InfoPage {
	buildVersion: string;
	appVersion: string;
    constructor (
    	private rootScope: GlobalService
	) {
	}
	shareApp(){
		this.rootScope.shareApp();
	}
	ionViewDidEnter(){
		this.buildVersion = this.rootScope.getGitVersion();
		this.appVersion = this.rootScope.getAppVersion();
	}
}
