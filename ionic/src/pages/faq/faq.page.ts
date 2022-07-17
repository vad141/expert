import { Component } from '@angular/core';
import {
	Download,
} from '../../providers/providers';
import { NavController } from '@ionic/angular';
@Component({
	selector: 'app-faq',
	templateUrl: 'faq.page.html',
	styleUrls: ['faq.page.scss'],
})
export class FaqPage {
	data: Array<any> = [];
    constructor (
    	private download: Download,
    	public navCtrl: NavController,
	) {
	}
	ngOnInit() {
        let self = this;
        self.data = self.download.updateData.faq;
    }
    goHome(){
		this.navCtrl.navigateRoot('reports');
	}
}
