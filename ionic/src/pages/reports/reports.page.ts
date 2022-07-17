import { Component } from '@angular/core';
import { NavController, MenuController, ModalController  } from '@ionic/angular';

import { AddReportModal } from "../../modal/addReport/addReport.page";
import {
    LocalStorage,
    Download,
    ReportsDb,
} from '../../providers/providers';
import * as moment from 'moment';

@Component({
	selector: 'app-reports',
	templateUrl: 'reports.page.html',
	styleUrls: ['reports.page.scss'],
})
export class ReportsPage {
    data: Array<any> = [];
    dataLoaded: boolean = false;
    constructor (
        private menu: MenuController,
        private modalCtrl: ModalController,
        public navCtrl: NavController,
        private download: Download,
        private reportsDb: ReportsDb,
        private localStorage: LocalStorage
	) {
	}
    ionViewDidEnter(){
        let self = this;
        if(self.download.updateData && self.download.updateData.reports) {
            self.reportsDb.getAll()
            .then((data: any) => {
                self.data = data.map((item) => {
                    item.typeName = self.download.updateData.reports.filter(i => i.id == item.type)[0].name;
                    item.examinationDate = moment(item.examinationDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
                    return item;
                });
                self.dataLoaded = true;
            });
        } else {
            setTimeout(() => {
                self.ionViewDidEnter();
            }, 300);
        }
    }
    edit(item) {
        this.navCtrl.navigateForward(`reports/${item.type}/${item.reportId}`);
    }
    remove(item){
        let self = this;
        self.reportsDb.remove(item.reportId)
        .then(() => {
            self.ionViewDidEnter();
        });
    }
    beforeOpenAdd(){
        let self = this;
        self.localStorage.get('user', false, true)
        .then((userData: any) => {
            if(userData && userData.type != 0) {
                self.navCtrl.navigateForward(`reports/${userData.type}/0`);
            } else {
                self.openAdd();           
            }
        });
    }
    openTable(item) {
        this.navCtrl.navigateForward(`tables/${item.type}/${item.reportId}`);
    }
    sendReport(item) {
        this.navCtrl.navigateForward(`send/${item.type}/${item.reportId}`);
    }
    async openAdd(){
        let self = this;
        
        const modal = await this.modalCtrl.create({
            component: AddReportModal,
            componentProps: {
                reports: self.download.updateData.reports
            }
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        if(data) {
            if(data) {
                self.navCtrl.navigateForward(`reports/${data.id}/0`);
            }
        }
    }
}
