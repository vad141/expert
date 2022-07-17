import { Component } from '@angular/core';
import { FormBuilder,
        FormGroup,
        Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation';
import {
	GlobalService,
} from '../../providers/providers';
import { NavController } from '@ionic/angular';
@Component({
	selector: 'app-feedback',
	templateUrl: 'feedback.page.html',
	styleUrls: ['feedback.page.scss'],
})
export class FeedbackPage {
	subjects: Array<string> = ['Выберите тему сообщения', 'Ошибка', 'Предложения по улучшению', 'Отзыв', 'Замечание', 'Добавить отчёт', 'Партнерство'];
	feedbackForm: FormGroup;
    fieldsName: Array<string> = ['subject', 'message'];
    constructor (
    	public rootScope: GlobalService,
    	public formBuilder: FormBuilder,
        public navCtrl: NavController,
	) {
	}
	ngOnInit() {
        let self = this;
        self.feedbackForm = self.formBuilder.group({
            subject: [self.subjects[0], [Validators.required, ValidationService.notValueSubject]],
            message: ['', [Validators.required, Validators.maxLength(500)]]
        });
    }
    send(){
    	let self = this;
        self.fieldsName.forEach((fieldName) => {
            self.feedbackForm.controls[fieldName].markAsTouched();
        });
        if(self.feedbackForm.valid) {
            let params: any = self.feedbackForm.getRawValue();
            console.log('params : ', params);
            self.rootScope.sendFeedback(params);
        }
    }
    goHome(){
        this.navCtrl.navigateRoot('reports');
    }
}
