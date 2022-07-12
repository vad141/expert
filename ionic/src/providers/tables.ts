import { Injectable } from '@angular/core';
import { ConstantProvider } from './constant';
import { DbProvider } from './db';

@Injectable()
export class TablesDb {
    constructor(
        public DB: DbProvider,
        public constant: ConstantProvider
    ) {
    }
    _then(resolveFunc) {
        console.log('Update tables table | ' + new Date().toISOString());
        resolveFunc();
    }
    _err(rejectFunc, methodName) {
        console.log('Error occured at tables table | ' + methodName + ' | ' + new Date().toISOString());
        rejectFunc();
    }
    set(data) {
        let self = this;
        return new Promise((resolve, reject) => {
            if(data.tableId) {
                self.DB.query([
                    'UPDATE tables',
                    'SET reportId = ?, order_id = ?, data = ?, photos = ?',
                    'WHERE tableId = ?'
                ], [
                    data.reportId,
                    data.order_id,
                    data.data,
                    data.photos,
                    data.tableId,
                ])
                .then(result => resolve(true), () => self._err(reject, 'set update'));
            } else {
                self.DB.query([
                    'INSERT OR REPLACE',
                    'INTO tables (reportId, order_id, data, photos)',
                    'VALUES (?, ?, ?, ?)'
                ], [
                    data.reportId,
                    data.order_id,
                    data.data,
                    data.photos
                ])
                .then(result => resolve(true), () => self._err(reject, 'set insert or replace'));
            }
        });
    }
    updateOrderId(order_id, tableId){
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'UPDATE tables',
                'SET order_id = ?',
                'WHERE tableId = ?'
            ], [
                order_id,
                tableId,
            ])
            .then(result => {
                console.log('updateOrderId order_id ', order_id, ' tableId ', tableId);
                resolve(true);
            }, () => self._err(reject, 'set updateOrderId'));
        });
    }

    get(tableId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM tables',
                'WHERE tableId=?'
            ], [
                tableId
            ])
            .then((result) => {
                resolve(self.DB.fetch(result))
            }, () => self._err(reject, 'getByTableId'));
        });
    }

    getAll(reportId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT *',
                'FROM tables',
                'WHERE reportId=?',
                'ORDER BY order_id ASC'
            ], [reportId])
            .then((result) => {
                resolve(self.DB.fetchAll(result))
            }, () => self._err(reject, 'getAll'));
        });
    }
    remove(tableId) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'DELETE',
                'FROM tables',
                'WHERE tableId=?'
            ], [
                tableId
            ])
            .then(result => resolve(true), () => self._err(reject, 'remove'));
        });
    }
    getCountOfRecords(){
        let self = this;
        return new Promise((resolve, reject) => {
            self.DB.query([
                'SELECT COUNT(*) as count',
                'FROM tables'
            ], [
            ])
            .then(result => resolve(self.DB.fetch(result).count), () => self._err(reject, 'getCountOfRecords'));
        });
    }
}