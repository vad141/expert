import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ConstantProvider } from './constant';
import { Platform } from '@ionic/angular';

@Injectable()
export class DbProvider {
    db: SQLiteObject;
    loadingMask: any;
    constructor(
        public constant: ConstantProvider,
        private sqlite: SQLite,
        public platform: Platform
    ) {
    }
    initDB() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getDB()
            .then(() => {
                let tables = self.constant.DB_CONFIG.tables.map((table) => {
                    let columns = [];
                    table.columns.forEach((column) => {
                        columns.push(column.name + ' ' + column.type);
                    });

                    let query = ['CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')'];

                    return self.initQuery(query).then(() => {
                        if (table.indexes) table.indexes.forEach((index) => {
                            let query = 'CREATE INDEX IF NOT EXISTS ' + index.name + ' ON ' + table.name + ' (' + index.column + ')';

                            self.initQuery([query]);
                        });
                    });
                });

                let dumps = self.constant.DB_CONFIG.versions_dump.map((dump) => {
                    let query = ['insert or ignore into versions (id, sql_up) values (' + dump + ')'];

                    return self.initQuery(query);
                });

                Promise.all(tables.concat(dumps))
                .then(() => {
                    self.upgrade()
                    .then(() => {
                        resolve(true);
                    });
                });
            });
        });
    }
    getDB() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.platform.ready()
            .then(() => {
                if(self.platform.is('cordova')) {
                    console.log('maxim before sqlite.create');
                    self.sqlite.create({
                        name: self.constant.DB_CONFIG.name,
                        location: 'default'
                    }).then((db: SQLiteObject) => {
                        console.log('maxim after sqlite.create');
                        self.db = db;
                        resolve(true);
                    });
                } else {
                    self.db = (<any> window).openDatabase(self.constant.DB_CONFIG.name, '1.0', 'database', -1);
                    resolve(true);
                }
            });
        });
    }

    initQuery(query) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.transaction((transaction) => {
                transaction.executeSql(query.join(' '), [], (transaction, result) => {
                    resolve(result);
                }, (transaction, error) => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }

    query(query, bindings: any = []) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.transaction((transaction) => {
                transaction.executeSql(query.join(' '), bindings, (transaction, result) => {
                    resolve(result);
                }, (transaction, error) => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }

    clear() {
        let self = this;
        if(self.platform.is('cordova')) return;

        self.constant.DB_CONFIG.tables.map(table => {
            self.db.transaction(transaction => {
                transaction.executeSql('DROP TABLE IF EXISTS ' + table.name, [], (tx, res) => {
                    console.log('%cdrop table %s', 'color:#F3782F; font-weight: bold; text-transform:uppercase;', table.name);
                });
            });
        });
    }

    fetchAll(result) {
        let output = [],
            i;

        for (i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    }

    fetch(result) {
        return result.rows.length ? result.rows.item(0) : null;
       }

    rowsAffected(result) {
        return result.rowsAffected;
    }

    getQueries () {
        let self = this;
        return self.query([
            'SELECT *',
            'FROM versions',
            'where upd = 0 and sql_up <> "" '
        ]).then((result) => {
            return self.fetchAll(result);
        }, (error) => {
            console.log('Select versions Error! ', error);
        });
    }

    getTableInfo(tableName) {
        let self = this;
        return self.query([
            'PRAGMA table_info(' + tableName + ')'
        ]).then((result) => {
            return self.fetchAll(result);
        }, (error) => {
            console.log('getTableInfo Error! ', error);
        });
    }

    upgrade() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.getQueries().then((queries: any = []) => {
                if(queries.length !== 0) {
                    queries.map((row) => {
                        self.query([row.sql_up]).then(() => {
                            console.log(row.sql_up + ' Execute' );
                            console.log ( ' == row id', row.id );

                            self.query(['UPDATE versions SET upd=1 WHERE id=?'], [row.id]).then((res) => {
                                console.log(' Execute update versions ', res);
                                resolve(true);
                            }, (error) => {
                                console.log('Error! Update versions ', error);
                                resolve(true);
                            });
                        }, (error) => {
                            console.log('Error! Upgrade DB ', error);
                            resolve(true);
                        });
                    });
                } else {
                    resolve(true);
                }
            });
        });
    }
}