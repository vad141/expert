import {FormControl} from '@angular/forms';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config: any = {
            'required': 'Поле обязательно к заполнению',
            'invalidPhone': 'Не правильный формат телефона',
            'invalidContractNumber': 'Не правильный формат номера договора',
            'invalidEmailAddress': 'Неправильный формат email',
            'minlength': `Минимальное количество символов - ${validatorValue.requiredLength}`,
            'maxlength': `Максимальное количество символов - ${validatorValue.requiredLength}`,
        };
            
        return config[validatorName];
    }

    static phoneValidator10(control) {
        if (control.value.replace(/\D+/g, '').length == 10) {
            return null;
        } else {
            return { 'invalidPhone': true };
        }
    }
    static contractValidator4(control) {
        if (control.value.replace(/\D+/g, '').length == 4) {
            return null;
        } else {
            return { 'invalidContractNumber': true };
        }
    }
    static emailValidator(control) {
        // RFC 2822 compliant regex
        if(control.value) {
            if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                return null;
            } else {
                return { 'invalidEmailAddress': true };
            }
        } else {
            return null;
        }
    }
}