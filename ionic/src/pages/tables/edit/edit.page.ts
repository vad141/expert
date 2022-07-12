import { Component } from '@angular/core';
import { NavController, AlertController  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder,
        FormGroup,
        Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation';
import {
    Download,
    Events,
    LocalStorage,
    TablesDb,
    DictionaryStorage,
} from '../../../providers/providers';

import * as moment from 'moment';

import { TextboxQuestion } from '../../../components/questions/question-textbox';
import { TextareaboxQuestion } from '../../../components/questions/question-textareabox';
import { QuestionBase } from '../../../components/questions/question-base';

@Component({
	selector: 'app-edit-table',
	templateUrl: 'edit.page.html',
	styleUrls: ['edit.page.scss'],
})
export class TableEditPage {
    title: string = 'Создание записи';
    type: string;
    reportId: number;
    tableId: number;
    form: FormGroup;
    questions: QuestionBase<any>[];

    questionsReady: boolean = false;
    table: any;
    formData: any;
    allowSave: boolean = false;

    send: any;
    fieldValues: any;

    photos: any = {};
    order_id: number;

    constructor (
        private alertCtrl: AlertController,
        public activRoute: ActivatedRoute,
        private navCtrl: NavController,
        private events: Events,
        private download: Download,
        private tablesDb: TablesDb,
        private dictionaryStorage: DictionaryStorage
	) {
        let self = this;
        self.type = self.activRoute.snapshot.paramMap.get('type');
        self.reportId = Number(self.activRoute.snapshot.paramMap.get('reportId'));
        self.tableId = Number(self.activRoute.snapshot.paramMap.get('tableId'));
        if(self.tableId) {
            self.title = 'Редактирование записи';
        } else {
            self.tablesDb.getCountOfRecords()
            .then((count: any) => {
                self.order_id = count;
            });
        }
	}
    ngOnDestroy(){
        let self = this;
        self.events.destroy('formValid');
        self.events.destroy('formInValid');
        self.events.destroy('photosChanged');
    }
    ngAfterViewInit() {
        let self = this;
        self.events.subscribe('formValid', (data) => {
            console.log('subscribe formValid');
            self.allowSave = true;
            self.send = data.rawValue;
        });
        self.events.subscribe('formInValid', (response) => {
            console.log('subscribe formInValid ', response);
            self.allowSave = false;
        });
        self.events.subscribe('photosChanged', (data) => {
            console.log('subscribe photosChanged ', data);
            self.photos = data.photos;
        });
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
                    this.navCtrl.navigateBack(`tables/${self.type}/${self.reportId}`);
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
    ionViewDidEnter(){
        let self = this;
        self.table = self.download.updateData.tables.filter(table => table.type == self.type)[0];
        
        self.formData = {};
        self.questions = self.table.fields.map((item) => {
            let question: QuestionBase<any>;

            self.formData[item.fieldName] = '';

            if(item.field === 'textareabox' || item.field === 'textareabox_dictionary') {
                question = new TextareaboxQuestion({
                    key: item.fieldName,
                    fieldName: item.fieldName,
                    fieldId: item.fieldId,
                    label: item.name,
                    controlType: item.field,
                    dictionary: item.dictionary,
                    havePhotos: item.havePhotos,
                    depend_on: item.depend_on,
                    clear_field: item.clear_field,
                    prefill: item.prefill,
                    prefill_dictionary: item.prefill_dictionary,
                    placeholder: item.placeholder,
                    value: '',
                    required: item.required,
                    maxLength: item.max
                });
            } else if(item.field === 'textbox' || item.field === 'textbox_dictionary' || item.field === 'textbox_autodictionary') {
                question = new TextboxQuestion({
                    key: item.fieldName,
                    fieldName: item.fieldName,
                    fieldId: item.fieldId,
                    label: item.name,
                    controlType: item.field,
                    dictionary: item.dictionary,
                    havePhotos: item.havePhotos,
                    depend_on: item.depend_on,
                    clear_field: item.clear_field,
                    prefill: item.prefill,
                    prefill_dictionary: item.prefill_dictionary,
                    placeholder: item.placeholder,
                    value: '',
                    required: item.required,
                    maxLength: item.max
                });
            }
            return question;
        });
        if(self.tableId) {
            self.tablesDb.get(self.tableId)
            .then((params: any) => {
                self.fieldValues = JSON.parse(params.data);
                self.order_id = params.order_id;
                self.photos = JSON.parse(params.photos);
                self.questionsReady= true;
            });
        } else {
            self.questionsReady= true;
        }
    }
    submit(){
        let self = this,
            params: any = {};
        params.timestamp = new Date().getTime();
        params.tableId = self.tableId;
        params.reportId = self.reportId;
        params.order_id = self.order_id;
        params.data = JSON.stringify(self.send);
        params.photos = JSON.stringify(self.photos);

        console.log('params ', params);
        self.tablesDb.set(params).then(()=> {
            let dictionaryPromise = []
            self.table.fields.forEach((item) => {
                if(item.field === 'textbox_autodictionary' && self.send[item.fieldName].length) {
                    console.log('maxim ', self.send[item.fieldName]);
                    dictionaryPromise.push(self.dictionaryStorage.set(item.fieldName, self.send[item.fieldName]));
                }
            });
            if(dictionaryPromise.length) {
                Promise.all(dictionaryPromise)
                .then(()=> {
                    self.navCtrl.navigateBack(`tables/${self.type}/${self.reportId}`);
                });
            } else {
                self.navCtrl.navigateBack(`tables/${self.type}/${self.reportId}`);
            }
        });
    }
}
