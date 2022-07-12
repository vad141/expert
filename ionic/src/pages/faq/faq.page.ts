import { Component } from '@angular/core';
import {
	Download,
} from '../../providers/providers';
@Component({
	selector: 'app-faq',
	templateUrl: 'faq.page.html',
	styleUrls: ['faq.page.scss'],
})
export class FaqPage {
	data: Array<any> = [];
    constructor (
    	private download: Download,
	) {
	}
	ngOnInit() {
        let self = this;
        self.data = self.download.updateData.faq;
    }
}
