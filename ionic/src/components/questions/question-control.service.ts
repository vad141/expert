import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
    constructor() { }

    toFormGroup(questions: QuestionBase<any>[] ) {
        let group: any = {};
        questions.forEach(question => {
            if(question.required || question.maxLength > 0) {
                let validations = [];
                if(question.required) {
                    validations.push(Validators.required);
                }
                if(question.maxLength > 0) {
                    validations.push(Validators.maxLength(question.maxLength));
                }
                group[question.key] = new FormControl(question.value || '', Validators.compose(validations));
            } else {
                group[question.key] = new FormControl(question.value || '');
            }
        });
        return new FormGroup(group);
    }
}
