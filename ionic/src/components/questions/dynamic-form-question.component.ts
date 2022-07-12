import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from './question-base';

@Component({
    selector: 'df-question',
    templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() photos: any;
    @Input() form: FormGroup;
    @Output() onOpenDictionary = new EventEmitter();
    @Output() onAddPhoto = new EventEmitter();
    @Output() onRemovePhoto = new EventEmitter();
    get isValid() { return this.form.controls[this.question.key].valid; }
    openDictionary(event, question){
        this.onOpenDictionary.emit({
            question:question,
            event: event
        });
    }
    addPhoto(question){
        this.onAddPhoto.emit({
            question:question
        });
    }
    removePhoto(question, idx){
        this.onRemovePhoto.emit({
            question:question,
            idx: idx
        });   
    }
}
