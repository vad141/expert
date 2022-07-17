import { Component, Input }		    	from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToastNotify } from '../../providers/providers';

@Component({
	selector: 'dictionary-page',
	templateUrl: 'dictionary.page.html',
    styleUrls: ['dictionary.page.scss']
})
export class DictionaryPopover {
	@Input() items: Array<any> = [];
	constructor(
		public modalCtrl: PopoverController,
		private toastNotify: ToastNotify,
	) {
		let self = this;
	}
	closeModal(dismiss) {
        this.modalCtrl.dismiss(dismiss);
    }
    showFull(text){
    	this.toastNotify.success(text, 10000);
    }
}