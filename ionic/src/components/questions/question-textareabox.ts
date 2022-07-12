import { QuestionBase } from './question-base';

export class TextareaboxQuestion extends QuestionBase<string> {
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
