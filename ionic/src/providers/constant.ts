import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {
    DB_CONFIG: any;
    constructor() {
        this.DB_CONFIG = {
            name: 'expert.db',
            tables: [{
                name: 'localstorage',
                columns: [{
                    name: 'id',
                    type: 'INTEGER PRIMARY KEY NOT NULL'
                }, {
                    name: 'name',
                    type: 'TEXT'
                }, {
                    name: 'value',
                    type: 'TEXT'
                }],
                indexes: []
            }, {
                name: 'files',
                columns: [{
                    name: 'id',
                    type: 'INTEGER PRIMARY KEY NOT NULL'
                }, {
                    name: 'fileId',
                    type: 'INTEGER'
                }, {
                    name: 'filePath',
                    type: 'TEXT'
                }, {
                    name: 'fileName',
                    type: 'TEXT'
                }, {
                    name: 'data',
                    type: 'TEXT'
                }],
                indexes: []
            }, {
                name: 'reports',
                columns: [{
                    name: 'reportId',
                    type: 'INTEGER PRIMARY KEY NOT NULL'
                }, {
                    name: 'type',
                    type: 'TEXT'
                }, {
                    name: 'reportName',
                    type: 'TEXT'
                }, {
                    name: 'address',
                    type: 'TEXT'
                }, {
                    name: 'examinationDate',
                    type: 'TEXT'
                }, {
                    name: 'examinationTime',
                    type: 'TEXT'
                }, {
                    name: 'fio',
                    type: 'TEXT'
                }, {
                    name: 'timestamp',
                    type: 'INTEGER'
                }],
                indexes: []
            }, {
                name: 'tables',
                columns: [{
                    name: 'tableId',
                    type: 'INTEGER PRIMARY KEY NOT NULL'
                }, {
                    name: 'reportId',
                    type: 'INTEGER'
                }, {
                    name: 'order_id',
                    type: 'INTEGER'
                }, {
                    name: 'data',
                    type: 'TEXT'
                }, {
                    name: 'photos',
                    type: 'TEXT'
                }],
                indexes: []
            }, {
                name: 'dictionary',
                columns: [{
                    name: 'id',
                    type: 'INTEGER PRIMARY KEY NOT NULL'
                }, {
                    name: 'fieldName',
                    type: 'TEXT'
                }, {
                    name: 'text',
                    type: 'TEXT'
                }],
                indexes: []
            }, {
                name: 'versions',
                columns: [{
                    name: 'id',
                    type: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL'
                }, {
                    name: 'sql_up',
                    type: 'TEXT NOT NULL'
                }, {
                    name: 'upd',
                    type: 'INTEGER DEFAULT 0'
                }],
                indexes: []
            }],
            versions_dump: [
            ]
        };
    }
}