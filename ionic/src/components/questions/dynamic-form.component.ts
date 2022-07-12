import { Component, Input, OnInit }  from '@angular/core';
import { PickerOptions } from '@ionic/core';
import { FormGroup  }                 from '@angular/forms';
import { ModalController, PopoverController, ActionSheetController, Platform } from '@ionic/angular';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { Events, Download, DictionaryStorage, ToastNotify } from '../../providers/providers';
import { Subscription } from 'rxjs';
import { DictionaryPopover } from '../../modal/dictionary/dictionary.page';
import { CropperModal } from "../../modal/cropper/cropper.page";
import {
    Camera,
    CameraOptions
} from '@ionic-native/camera/ngx';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
    subscription: Subscription;
    @Input() questions: QuestionBase<any>[] = [];
    @Input() fieldValues: any;
    @Input() photosValues: any;
    form: FormGroup;
    fieldsName: Array<string> = [];
    onChangeEvent: boolean = false;
    formChangesSubscription: any;

    questionPhoto: any;
    values: any = {};
    photos: any = {};

    constructor (
        private popoverCntr: PopoverController,
        private modalCntr: ModalController,
        private qcs: QuestionControlService,
        private events: Events,
        private download: Download,
        private toastNotify: ToastNotify,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private dictionaryStorage: DictionaryStorage,
        private platform: Platform,
        private domSanitizer: DomSanitizer
    ) {
    }
    ngOnInit() {
        let self = this;
        self.initForm();
    }
    ngOnDestroy(){
        let self = this;
        self.formChangesSubscription.unsubscribe();
    }
    initForm(){
        let self = this;
        self.form = self.qcs.toFormGroup(self.questions);
        self.fieldsName = []
        self.questions.forEach((item) => {
            self.fieldsName.push(item.key);
        });
        self.validateForm();
    }
    validateForm(){
        let self = this;
        self.fieldsName.forEach((fieldName) => {
            self.form.controls[fieldName].markAsTouched();
        });
        if(self.form.valid) {
            self.events.publish('formValid', {
                rawValue: self.form.getRawValue(),
                photos: self.photos
            });
        } else {
            self.events.publish('formInValid', {
                rawValue: self.form.getRawValue()
            });
        }
    }
    ngAfterViewInit() {
        let self = this;
        self.subscribeForm();
        setTimeout(() => {
            self.setData();
        }, 100);
    }
    setData(){
        let self = this;
        let data = this.fieldValues;
        let photos = this.photosValues;
        if(data) {
            let time = 500;
            for(let key in data) {
                self.form.controls[key].setValue(data[key]);
            }
        }
        if(photos) {
            self.photos = photos;
        }
    }
    subscribeForm(){
        let self = this;
        if(self.formChangesSubscription) {
            self.formChangesSubscription.unsubscribe();
        }
        self.formChangesSubscription = self.form.valueChanges.subscribe(data => {
            if(self.form.valid) {
                self.events.publish('formValid', {
                    rawValue: self.form.getRawValue()
                });
            } else {
                self.events.publish('formInValid', {
                    rawValue: self.form.getRawValue()
                });
            }
        });

    }
    onChange(data){
        let self = this,
            event = data.event,
            question = data.question,
            hideFields;
        if(self.onChangeEvent || !question) {
            return;
        } else {
            self.onChangeEvent = true;
            setTimeout(() => {
                self.onChangeEvent = false;
            }, 10);
        }
        self.questions = self.questions.map((question) => {
            question.value = self.form.controls[question.key].value;
            return question;
        });

        self.initForm();
        self.subscribeForm();
    }
    openDictionary(info){
        let self = this;
        /*{
            "value": "",
            "key": "element",
            "label": "Конструкция",
            "required": true,
            "fieldId": "2",
            "controlType": "textbox_dictionary",
            "maxLength": 100,
            "fieldName": "",
            "placeholder": "Укажите название конструктивного элемента",
            "dictionary": "table_constructions",
            "havePhotos": false,
            "depend_on": "",
            "clear_field": [
                "defect",
                "event"
            ],
            "prefill": "",
            "prefill_dictionary": "",
            "type": ""
        }*/
        if(self.download.updateData[info.question.dictionary]) {
            if(info.question.depend_on.length) {
                if(self.values[info.question.depend_on] && self.values[info.question.depend_on].id) {
                    let items = self.download.updateData[info.question.dictionary].filter((item) => {
                        return item.parentId === self.values[info.question.depend_on].id;
                    });
                    if(items.length) {
                        self.doOpenDictionary(info.event, info.question, items);
                    } else {
                        self.toastNotify.success('Словарь по данному полю пуст.')
                    }
                } else {
                    self.doOpenDictionary(info.event, info.question, self.download.updateData[info.question.dictionary]);    
                }
            } else {
                self.doOpenDictionary(info.event, info.question, self.download.updateData[info.question.dictionary]);
            }
        } else {
            if(info.question.controlType.indexOf("autodictionary") !== -1) {
                self.dictionaryStorage.get(info.question.fieldName)
                .then((items: Array<any>) => {
                    if(items.length) {
                        self.doOpenDictionary(info.event, info.question, items);
                    } else {
                        self.toastNotify.success('Словарь по данному полю пуст.')
                    }
                });                
            }
        }
    }
    async openCropper(image){
        let self = this;
        const modal = await this.modalCntr.create({
            component: CropperModal,
            backdropDismiss: true,
            showBackdrop: true,
            componentProps: {
                image
            },
            cssClass: 'cropper-modal-screen'
        });
        await modal.present();

        let { data } = await modal.onDidDismiss();
        if(data) {
            let image,
                currWeight,
                canvas,
                ctx,
                compressBase64;
            
            image = new Image;
            currWeight = (data.length - 814) / 1.37 / 1024;
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            image.onload = function(){
                if(currWeight > 300) { //300 кб
                    compressBase64();    
                } else {
                    if(!self.photos[self.questionPhoto.fieldName]) {
                        self.photos[self.questionPhoto.fieldName] = [];
                    }
                    self.photos[self.questionPhoto.fieldName].push(data);
                    self.events.publish('photosChanged', {
                        photos: self.photos
                    });
                }
            };
            compressBase64 = () => {
                canvas.width = image.width * 0.9;
                canvas.height = image.height * 0.9;
                ctx.drawImage(image, 0, 0, image.width * 0.9, image.height * 0.9);
                data = canvas.toDataURL('image/jpeg');
                ctx.clearRect(0, 0, image.width * 0.9, image.height * 0.9);
                currWeight = (data.length - 814) / 1.37 / 1024;
                image.src = data;
            };
            image.src = data;
        }
    }

    async doOpenDictionary(event, question, items){
        let self = this;
        const popover = await this.popoverCntr.create({
            component: DictionaryPopover,
            componentProps: {
                items: items
            },
            cssClass: 'my-custom-class',
            event: event,
            translucent: true
        });
        await popover.present();

        const { data } = await popover.onDidDismiss();
        if(data) {
            self.form.controls[question.fieldName].setValue(data.text);
            self.values[question.fieldName] = data;
            question.clear_field.forEach((field) => {
                self.form.controls[field].setValue('');
                self.values[field] = null;
            });
            if(question.prefill.length) {
                let prefilValue = self.download.updateData[question.prefill_dictionary].filter((item) => {
                    return item.id === data.id
                })[0];
                if(prefilValue && prefilValue.id) {
                    self.values[question.prefill] = prefilValue;
                    self.form.controls[question.prefill].setValue(prefilValue.text);
                }
            }
            console.log('question ', question)
            console.log('data ', data);
            console.log('question.fieldName ', question.fieldName);
        }
    }
    async addPhoto(event) {
        let self = this;
        self.questionPhoto = event.question;
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Выберите источник',
            buttons: [{
                text: 'Камера',
                handler: () => {
                    self.getPhoto('camera');
                }
            }, {
                text: 'Галлерея',
                handler: () => {
                    self.getPhoto('photolibrary');
                }
            }, {
                text: 'Отмена',
                role: 'cancel'
            }]
        });
        await actionSheet.present();
    }
    getPhoto(type) {
        let self = this;
        const options: CameraOptions = {
            quality: 20,
            destinationType: self.camera.DestinationType.DATA_URL,
            encodingType: self.camera.EncodingType.JPEG,
            mediaType: self.camera.MediaType.PICTURE,
            sourceType: self.camera.PictureSourceType[type.toUpperCase()],
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit: false
        };
        self.camera.getPicture(options).then((imageData) => {
            self.openCropper(
                this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData)                
            );
        }, (err) => {
            self.toastNotify.error('Не удалось получить фото');
        });
    }
    removePhoto(event) {
        let self = this;
        self.photos[event.question.fieldName].splice(event.idx, 1);
        self.events.publish('photosChanged', {
            photos: self.photos
        });
    }
}