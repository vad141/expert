import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
