import { Injectable } from '@angular/core';
import { ConstantProvider } from './constant';
import { DbProvider } from './db';

@Injectable()
export class LocalStorage {
    constructor(
        public DB: DbProvider,
        public constant: ConstantProvider
    ) {
    }
    _then(resolveFunc) {
        console.log('Update localstorage table | ' + new Date().toISOString());
        resolveFunc();
    }
    _err(rejectFunc, methodName) {
        console.log('Error occured at localstorage table | ' + methodName + ' | ' + new Date().toISOString());
        rejectFunc();
    }
    set(name, value, isObject) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM localstorage',
                'WHERE name=?'
            ], [
                name
            ])
            .then((result) => {
                let data = self.DB.fetch(result);
                if(data) {
                    self.DB.query([
                        'UPDATE localstorage',
                        'SET value = ?',
                        'WHERE name = ?'
                    ], [
                        isObject ? JSON.stringify(value) : value,
                        name
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set update'));
                } else {
                    self.DB.query([
                        'INSERT OR REPLACE',
                        'INTO localstorage (name, value)',
                        'VALUES (?, ?)'
                    ], [
                        name,
                        isObject ? JSON.stringify(value) : value
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set insert or replace'));
                }
            }, () => self._err(reject, 'set'));
        });
    }
    get(name, defaultValue, isObject) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM localstorage',
                'WHERE name=?'
            ], [
                name
            ])
            .then((result) => {
                let data = self.DB.fetch(result);
                if(data && data.value) {
                    if(isObject) {
                        resolve(JSON.parse(data.value));
                    } else {
                        resolve(data.value);
                    }
                } else {
                    resolve(defaultValue);
                }
            }, () => self._err(reject, 'get'));
        });
    }
    remove(name) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'DELETE',
                'FROM localstorage',
                'WHERE name=?'
            ], [
                name
            ])
            .then(result => resolve(true), () => self._err(reject, 'remove'));
        });
    }
}