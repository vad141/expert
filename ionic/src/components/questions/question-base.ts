export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    fieldId: number;
    controlType: string;
    maxLength: number;
    fieldName: string;
    placeholder: string;
    dictionary: string;
    havePhotos: boolean;
    depend_on: string;
    clear_field: Array<string>;
    prefill: string;
    prefill_dictionary: string;
    
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        fieldId?: number,
        controlType?: string,
        maxLength?: number,
        fieldName?: string,
        placeholder?: string,
        dictionary?: string,
        havePhotos?: boolean,
        depend_on?: string,
        clear_field?: Array<string>,
        prefill?: string,
        prefill_dictionary?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.fieldId = options.fieldId;
        this.controlType = options.controlType || '';
        this.maxLength = options.maxLength || null;
        this.fieldName = options.fieldName || '';
        this.placeholder = options.placeholder || '';
        this.dictionary = options.dictionary || '';
        this.havePhotos = options.havePhotos || false;
        this.depend_on = options.depend_on || '';
        this.clear_field = options.clear_field || [];
        this.prefill = options.prefill || '';
        this.prefill_dictionary = options.prefill_dictionary || '';
    }
}
