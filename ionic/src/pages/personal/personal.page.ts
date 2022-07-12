import { Component } from '@angular/core';
import { AlertController  } from '@ionic/angular';

import { FormBuilder,
        FormGroup,
        Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation';
import {
	GlobalService,
	ToastNotify,
    LocalStorage,
    Download,
} from '../../providers/providers';

@Component({
	selector: 'app-personal',
	templateUrl: 'personal.page.html',
	styleUrls: ['personal.page.scss'],
})
export class PersonalPage {
	personalForm: FormGroup;
    fieldsName: Array<string> = ['surname', 'name', 'secondName', 'position'];
    types: Array<any>;
    constructor (
    	private localStorage: LocalStorage,
    	private download: Download,
    	public formBuilder: FormBuilder,
    	public toastNotify: ToastNotify,
    	public rootScope: GlobalService,
    	private alertCtrl: AlertController,
	) {
	}
	ngOnInit() {
        let self = this;
        self.types = [...[{name: 'Выбрать', id: '0'}], ...self.download.updateData.reports];
        self.personalForm = self.formBuilder.group({
            surname: ['', [Validators.required, Validators.maxLength(33)]],
            name: ['', [Validators.required, Validators.maxLength(33)]],
            secondName: ['', [Validators.required, Validators.maxLength(33)]],
            position: ['', [Validators.required, Validators.maxLength(100)]],
            type: [self.types[0].id],
        });
    }
    ionViewDidEnter(){
    	let self = this;
    	self.localStorage.get('politicsNotify', false, false)
    	.then((politicsNotify: boolean) => {
    		if(!politicsNotify) {
    			self.notifyPolitics();
    		}
    	});
    	self.localStorage.get('user', false, true)
    	.then((userData: any) => {
    		if(userData) {
    			self.personalForm.controls.surname.setValue(userData.surname);
    			self.personalForm.controls.name.setValue(userData.name);
    			self.personalForm.controls.secondName.setValue(userData.secondName);
    			self.personalForm.controls.position.setValue(userData.position);
    			self.personalForm.controls.type.setValue(userData.type);
    		}
    	});
    }
    save(){
    	let self = this;
        self.fieldsName.forEach((fieldName) => {
            self.personalForm.controls[fieldName].markAsTouched();
        });
        if(self.personalForm.valid) {
            let params: any = self.personalForm.getRawValue();
            console.log('params : ', params);
            self.localStorage.set('user', params, true)
            .then(() => {
            	self.toastNotify.success('Данные сохранены')
            });
        }
    }
    async notifyPolitics(){
    	let self = this;
        let alert = await self.alertCtrl.create({
            header: 'Внимание',
            message: 'Указанные данные будут использоваться для упрощения подготовки отчётов. Сохраняя данные в приложении вы даёте согласие на обработку персональных данных, согласно Политике конфиденциальности и Условиям использования сервиса.',
            backdropDismiss: false,
            mode: 'md',
            buttons: [{
                text: 'Ознакомиться',
                handler: () => {
                    self.rootScope.openPolitics();
                    self.notifyPolitics();
                }
            }, {
                text: 'Принять',
                handler: () => {
                	self.localStorage.set('politicsNotify', true, false)
                	.then(() => {
                    	alert.dismiss();
                	});
                }
            }]
        });
        alert.present();
    }
}

