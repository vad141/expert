import { Injectable } from '@angular/core';
import { ConstantProvider } from './constant';
import { DbProvider } from './db';

@Injectable()
export class ReportsDb {
    constructor(
        public DB: DbProvider,
        public constant: ConstantProvider
    ) {
    }
    _then(resolveFunc) {
        console.log('Update reports table | ' + new Date().toISOString());
        resolveFunc();
    }
    _err(rejectFunc, methodName) {
        console.log('Error occured at reports table | ' + methodName + ' | ' + new Date().toISOString());
        rejectFunc();
    }
    set(data) {
        let self = this;
        return new Promise((resolve, reject) => {
            if(data.reportId) {
                self.DB.query([
                    'UPDATE reports',
                    'SET reportName = ?, type = ?, address = ?, examinationDate = ?, examinationTime = ?, fio = ?, timestamp = ?',
                    'WHERE reportId = ?'
                ], [
                    data.reportName,
                    data.type,
                    data.address,
                    data.examinationDate,
                    data.examinationTime,
                    data.fio,
                    data.timestamp,
                    data.reportId,
                ])
                .then(result => resolve(true), () => self._err(reject, 'set update'));
            } else {
                self.DB.query([
                    'INSERT OR REPLACE',
                    'INTO reports (reportName, type, address, examinationDate, examinationTime, fio, timestamp)',
                    'VALUES (?, ?, ?, ?, ?, ?, ?)'
                ], [
                    data.reportName,
                    data.type,
                    data.address,
                    data.examinationDate,
                    data.examinationTime,
                    data.fio,
                    data.timestamp,
                ])
                .then(result => resolve(true), () => self._err(reject, 'set insert or replace'));
            }
        });
    }

    getByReportId(reportId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM reports',
                'WHERE reportId=?'
            ], [
                reportId
            ])
            .then((result) => {
                resolve(self.DB.fetch(result))
            }, () => self._err(reject, 'getByReportId'));
        });
    }

    getAll() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM reports',
                'ORDER BY timestamp DESC'
            ], [])
            .then((result) => {
                resolve(self.DB.fetchAll(result))
            }, () => self._err(reject, 'getAll'));
        });
    }
    getLatest(){
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM reports',
                'max(timestamp)'
            ], [])
            .then((result) => {
                resolve(self.DB.fetchAll(result))
            }, () => self._err(reject, 'getAll'));
        });
    }
    remove(reportId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'DELETE',
                'FROM reports',
                'WHERE reportId=?'
            ], [
                reportId
            ])
            .then(result => resolve(true), () => self._err(reject, 'remove'));
        });
    }
}