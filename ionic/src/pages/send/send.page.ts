import { Component } from '@angular/core';
import { FormBuilder,
        FormGroup,
        Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation';
import {
	GlobalService,
	ToastNotify,
    LocalStorage,
    Download,
    TablesDb,
    ReportsDb,
} from '../../providers/providers';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-send',
	templateUrl: 'send.page.html',
	styleUrls: ['send.page.scss'],
})
export class SendPage {
	personalForm: FormGroup;
    fieldsName: Array<string> = ['receiver1','receiver2','receiver3','receiver4','receiver5','receiver6'];
    types: Array<any>;
    type: string;
    reportId: number;
    userData: any = false;
    tables: Array<any> = [];
    reportInfo: any = {};
    constructor (
    	private localStorage: LocalStorage,
    	private download: Download,
    	public formBuilder: FormBuilder,
    	public toastNotify: ToastNotify,
    	public rootScope: GlobalService,
        public activRoute: ActivatedRoute,
        private tablesDb: TablesDb,
        public navCtrl: NavController,
        private reportsDb: ReportsDb,
	) {
        let self = this;
        self.type = self.activRoute.snapshot.paramMap.get('type');
        self.reportId = Number(self.activRoute.snapshot.paramMap.get('reportId'));
	}
	ngOnInit() {
        let self = this;
        self.personalForm = self.formBuilder.group({
            receiver1: ['', [Validators.required, ValidationService.emailValidator]],
            receiver2: ['', [ValidationService.emailValidator]],
            receiver3: ['', [ValidationService.emailValidator]],
            receiver4: ['', [ValidationService.emailValidator]],
            receiver5: ['', [ValidationService.emailValidator]],
            receiver6: ['', [ValidationService.emailValidator]]
        });
    }
    ionViewDidEnter(){
    	let self = this;
        self.localStorage.get('user', false, true)
        .then((userData: any) => {
            if(userData) {
                self.userData = userData;
            }
        });
        self.reportsDb.getByReportId(self.reportId)
        .then((report: any) => {
            self.reportInfo = report;
        });
        self.tablesDb.getAll(self.reportId)
        .then((tables: Array<any>) => {
            self.tables = tables;
        });
    }
    goBack(){
        this.navCtrl.navigateBack('reports');
    }
    errorNoTables(){

    }
    save(){
    	let self = this;
        self.fieldsName.forEach((fieldName) => {
            self.personalForm.controls[fieldName].markAsTouched();
        });
        if(self.personalForm.valid) {
            let params: any = {
                receivers: [],
                data: []
            };

            self.fieldsName.forEach((fieldName) => {
                if(self.personalForm.controls[fieldName].value.length) {
                    params.receivers.push(self.personalForm.controls[fieldName].value);
                }
            });

            params.subject = self.reportInfo.reportName;
            params.address = self.reportInfo.address;
            params.date = self.reportInfo.examinationDate;
            params.examinationTime = self.reportInfo.examinationTime;

            params.first_name = self.userData ? self.userData.name : '';
            params.last_name = self.userData ? self.userData.surname : '';
            params.middle_name = self.userData ? self.userData.secondName : '';
            params.post = self.userData ? self.userData.position : '';

            params.type = self.reportInfo.type;

            console.log('self.userData : ', self.userData);
            console.log('self.reportInfo : ', self.reportInfo);
            console.log('self.tables : ', self.tables);
            if(self.tables.length) {
                self.tables.forEach((item) => {
                    params.data.push({
                        table_id: item.tableId,
                        report_id: item.reportId,
                        table_type: 1, // TODO hardcoded
                        data: item.data,
                        photos: item.photos,
                        order_id: item.order_id
                    });
                });
                console.log('params : ', params);
                if(!self.userData) { //TODO после отправки данных
                    self.toastNotify.error('«На экране «Личный кабинет» вы можете указать фамилию, имя, отчество и должность эксперта. Эти данные будут добавлены в отчёт.');
                }
            } else {
                console.log('params : ', params);
                self.toastNotify.error('Отчёт не содержит данных. Отправка отчета не будет выполнена.');
            }            
        }
    }
}

