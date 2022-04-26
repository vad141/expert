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