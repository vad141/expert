import { Component, Input }		    	from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
	selector: 'dictionary-page',
	templateUrl: 'dictionary.page.html',
    styleUrls: ['dictionary.page.scss']
})
export class DictionaryPopover {
	@Input() items: Array<any> = [];
	constructor(
		public modalCtrl: PopoverController
	) {
		let self = this;
	}
	closeModal(dismiss) {
        this.modalCtrl.dismiss(dismiss);
    }
}