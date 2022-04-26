import { Component } from '@angular/core';
import { NavController, MenuController  } from '@ionic/angular';

//import { ReportsTable } from '../../providers/providers';

@Component({
	selector: 'app-reports',
	templateUrl: 'reports.page.html',
	styleUrls: ['reports.page.scss'],
})
export class ReportsPage {
    data: Array<any> = [];
    constructor (
        private menu: MenuController,
	) {
	}
    ionViewDidEnter(){
        let self = this;
    }
    openAdd(event) {
    
    }
}
