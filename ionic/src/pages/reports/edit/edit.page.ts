import { Component } from '@angular/core';
import { NavController, AlertController  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder,
        FormGroup,
        Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation';
import {
    LocalStorage,
    ReportsDb,
} from '../../../providers/providers';

import * as moment from 'moment';

@Component({
	selector: 'app-edit-reports',
	templateUrl: 'edit.page.html',
	styleUrls: ['edit.page.scss'],
})
export class ReportEditPage {
    title: string = 'Создание отчета';
    type: string;
    reportId: number;

    minDate: string = moment(new Date()).format('YYYY-MM-DD');
    maxDate: string = moment(new Date(new Date().setFullYear(new Date().getFullYear() + 5))).format('YYYY-MM-DD');
    currTime: string = moment(new Date()).format('HH:mm');

    reportForm: FormGroup;
    fieldsName: Array<string> = ['reportName', 'address', 'examinationDate', 'examinationTime', 'fio'];

    constructor (
        public activRoute: ActivatedRoute,
        private alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        private navCtrl: NavController,
        private reportsDb: ReportsDb,
        private localStorage: LocalStorage
	) {
        let self = this;
        self.type = self.activRoute.snapshot.paramMap.get('type');
        self.reportId = Number(self.activRoute.snapshot.paramMap.get('reportId'));
        if(self.reportId) {
            self.title = 'Редактирование отчета';
        }
	}
    ngOnInit() {
        let self = this;
        self.reportForm = self.formBuilder.group({
            type: [self.type],
            reportId: [self.reportId],
            reportName: ['', [Validators.required, Validators.maxLength(100)]],
            address: ['', [Validators.maxLength(100)]],
            examinationDate: [self.minDate, [Validators.required]],
            examinationTime: [self.currTime, [Validators.required]],
            fio: ['', [Validators.maxLength(100)]],
            timestamp: [new Date().getTime()],
        });
    }
    formatDate(date){
        return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
    }
    ionViewDidEnter(){
        let self = this;
        if(self.reportId) {
            self.reportsDb.getByReportId(self.reportId)
            .then((report: any) => {
                self.reportForm.controls.reportName.setValue(report.reportName);
                self.reportForm.controls.examinationDate.setValue(report.examinationDate);
                self.reportForm.controls.examinationTime.setValue(report.examinationTime);
                if(report.address.length) {
                    self.reportForm.controls.address.setValue(report.address);
                }
                if(report.fio.length) {
                    self.reportForm.controls.fio.setValue(report.fio);
                }
            });
        } else {
            self.localStorage.get('user', false, true)
            .then((userData: any) => {
                if(userData) {
                    self.reportForm.controls.fio.setValue(userData.name + ' ' + userData.secondName + ' ' + userData.surname);
                }
            });            
        }
    }
    save(){
        let self = this;
        self.fieldsName.forEach((fieldName) => {
            self.reportForm.controls[fieldName].markAsTouched();
        });
        if(self.reportForm.valid) {
            let params: any = self.reportForm.getRawValue();
            console.log('params : ', params);
            self.reportsDb.set(params).then(() => {
                if(self.reportId) {
                    self.navCtrl.navigateBack('reports');
                } else {
                    //TODO - перенаправление на 6.5. Экран “Таблица данных отчёта” 
                    self.navCtrl.navigateBack('reports');
                }
            });
        }
    }
    async goBack(){
        let self = this;
        let alert = await self.alertCtrl.create({
            header: 'Внимание',
            message: 'Не сохраненные данные будут потеряны. Хотите выйти с этого экрана ?',
            backdropDismiss: false,
            mode: 'md',
            buttons: [{
                text: 'Да',
                handler: () => {
                    alert.dismiss();
                    self.navCtrl.navigateBack('reports');
                }
            }, {
                text: 'Отмена',
                handler: () => {
                    alert.dismiss();
                }
            }]
        });
        alert.present();
    }
}
