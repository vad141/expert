import { Injectable } from '@angular/core';
import { ConstantProvider } from './constant';
import { DbProvider } from './db';

@Injectable()
export class DictionaryStorage {
    constructor(
        public DB: DbProvider,
        public constant: ConstantProvider
    ) {
    }
    _then(resolveFunc) {
        console.log('Update dictionary table | ' + new Date().toISOString());
        resolveFunc();
    }
    _err(rejectFunc, methodName) {
        console.log('Error occured at dictionary table | ' + methodName + ' | ' + new Date().toISOString());
        rejectFunc();
    }
    set(fieldName, text) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM dictionary',
                'WHERE text=?'
            ], [
                text
            ])
            .then((result) => {
                let data = self.DB.fetch(result);
                if(data) {
                    self.DB.query([
                        'UPDATE dictionary',
                        'SET text = ?',
                        'WHERE fieldName = ?'
                    ], [
                        text,
                        fieldName
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set update'));
                } else {
                    self.DB.query([
                        'INSERT OR REPLACE',
                        'INTO dictionary (fieldName, text)',
                        'VALUES (?, ?)'
                    ], [
                        fieldName,
                        text
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set insert or replace'));
                }
            }, () => self._err(reject, 'set'));
        });
    }
    get(fieldName) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM dictionary',
                'WHERE fieldName=?'
            ], [
                fieldName
            ])
            .then((result) => {
                resolve(self.DB.fetchAll(result));
            }, () => self._err(reject, 'get'));
        });
    }
}