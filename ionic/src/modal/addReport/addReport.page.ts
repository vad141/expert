import { Component, Input }		    	from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'addReport-page',
	templateUrl: 'addReport.page.html',
    styleUrls: ['addReport.page.scss']
})
export class AddReportModal {
	@Input() reports: Array<any> = [];
	constructor(
		public modalCtrl: ModalController
	) {
		let self = this;
	}
	closeModal(dismiss) {
        this.modalCtrl.dismiss(dismiss);
    }
}