import { Injectable } from '@angular/core';
import { ConstantProvider } from './constant';
import { DbProvider } from './db';

@Injectable()
export class FilesDb {
    constructor(
        public DB: DbProvider,
        public constant: ConstantProvider
    ) {
    }
    _then(resolveFunc) {
        console.log('Update files table | ' + new Date().toISOString());
        resolveFunc();
    }
    _err(rejectFunc, methodName) {
        console.log('Error occured at files table | ' + methodName + ' | ' + new Date().toISOString());
        rejectFunc();
    }
    set(fileInfo, info) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM files',
                'WHERE fileId=?'
            ], [
                fileInfo.fileId
            ])
            .then((result) => {
                let data = self.DB.fetch(result);
                if(data) {
                    self.DB.query([
                        'UPDATE files',
                        'SET filePath = ?, fileName = ?, data = ?',
                        'WHERE fileId = ?'
                    ], [
                        fileInfo.filePath,
                        fileInfo.fileName,
                        JSON.stringify(info),
                        fileInfo.fileId,
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set update'));
                } else {
                    self.DB.query([
                        'INSERT OR REPLACE',
                        'INTO files (fileId, filePath, fileName, data)',
                        'VALUES (?, ?, ?, ?)'
                    ], [
                        fileInfo.fileId,
                        fileInfo.filePath,
                        fileInfo.fileName,
                        JSON.stringify(info)
                    ])
                    .then(result => resolve(true), () => self._err(reject, 'set insert or replace'));
                }
            }, () => self._err(reject, 'set'));
        });
    }
    getByFileId(fileId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM files',
                'WHERE fileId=?'
            ], [
                fileId
            ])
            .then((result) => {
                let files = self.DB.fetchAll(result);
                if(files.length) {
                    resolve(files[0])
                } else {
                    reject();
                }
            }, () => self._err(reject, 'getByFileId'));
        });
    }
    remove(name) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'DELETE',
                'FROM files',
                'WHERE name=?'
            ], [
                name
            ])
            .then(result => resolve(true), () => self._err(reject, 'remove'));
        });
    }
}