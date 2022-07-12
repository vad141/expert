import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

import { NavController, MenuController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AddReportModal } from "../../modal/addReport/addReport.page";
import {
    LocalStorage,
    Download,
    ReportsDb,
    TablesDb,
} from '../../providers/providers';
import * as moment from 'moment';

@Component({
	selector: 'app-tables',
	templateUrl: 'tables.page.html',
	styleUrls: ['tables.page.scss'],
})
export class TablesPage {
    data: Array<any> = [];
    tables: Array<any> = [];
    dataLoaded: boolean = false;
    tableName: string;
    type: string;
    reportId: number;
    imgWidth: number;
    title: string;
    report: any;
    orderSwitch: boolean = true;
    constructor (
        private menu: MenuController,
        private modalCtrl: ModalController,
        public navCtrl: NavController,
        private download: Download,
        private reportsDb: ReportsDb,
        private localStorage: LocalStorage,
        public activRoute: ActivatedRoute,
        private tablesDb: TablesDb,
        private platform: Platform
	) {
        let self = this;
        self.type = self.activRoute.snapshot.paramMap.get('type');
        self.reportId = Number(self.activRoute.snapshot.paramMap.get('reportId'));
        self.imgWidth = self.platform.width() - 70;
	}
    switchOrder(){
        this.orderSwitch = !this.orderSwitch;
    }
    ionViewDidEnter(){
        let self = this;
        self.data = [];
        if(self.download.updateData && self.download.updateData.reports) {
            self.title = self.download.updateData.reports.filter(item => item.id == self.type)[0].name;
            self.reportsDb.getByReportId(self.reportId)
            .then((report: any) => {
                /*{
                    "reportId": 4,
                    "type": "3",
                    "reportName": "товароведческий",
                    "address": "",
                    "examinationDate": "2022-05-13",
                    "examinationTime": "08:57",
                    "fio": "ФМ",
                    "timestamp": 1652255484559
                }*/
                self.report = report;
                self.tablesDb.getAll(self.reportId)
                .then((tables: Array<any>) => {
                    self.tables = tables;
                    self.tables.forEach((item) => {
                        let ret = {
                            data: JSON.parse(item.data),
                            photos: JSON.parse(item.photos),
                            text: [],
                            tableId: item.tableId,
                            order_id: item.order_id
                        };
                        for(let key in ret.data) {
                            ret.text.push({
                                text : ret.data[key],
                                key: key
                            });
                            if(ret.photos[key]) {
                                ret.text.push({
                                    photo : ret.photos[key][0],
                                    key: key
                                });
                            }
                        }
                        console.log('ret.text ', ret.text);
                        delete ret.data;
                        delete ret.photos;
                        self.data.push(ret);
                    });
                    self.dataLoaded = true;
                })
            });
        } else {
            setTimeout(() => {
                self.ionViewDidEnter();
            }, 300);
        }
    }
    goBack(){
        this.navCtrl.navigateBack('reports');
    }
    openAdd(){
        this.navCtrl.navigateForward(`tables/${this.type}/${this.reportId}/0`);
    }
    openEdit(item){
        this.navCtrl.navigateForward(`tables/${this.type}/${this.reportId}/${item.tableId}`);
    }
    orderChanged(ev: CustomEvent<ItemReorderEventDetail>){
        let self = this,
            element = self.data[ev.detail.from];

        self.data.splice(ev.detail.from, 1);
        self.data.splice(ev.detail.to, 0, element);
        
        let promices = [];
        self.data.forEach((item, index) => {
            promices.push(self.tablesDb.updateOrderId(index, item.tableId));
        });
        ev.detail.complete();
        Promise.all(promices);
    }
    remove(item){
        let self = this;
        self.tablesDb.remove(item.tableId)
        .then(() => {
            self.ionViewDidEnter();
        });
    }
}
