import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { FilesDb } from './files';

@Injectable()
export class Download {
    baseUrl: string = 'https://nordcloudsoft.com/app/epcp/update/';
    updateData: any;
    checkFileIndex: number;
    constructor(
        public http: HttpClient,
        public filesDb: FilesDb,
        public platform: Platform
    ) {
        let self = this;
        if(!self.platform.is('cordova')) {
            self.baseUrl = './assets/temp/'
        }
    }
    makeUpdate(){
        let self = this;
        return new Promise((resolve, reject) => {
            self.http.get(self.baseUrl + 'update.json')
            .subscribe(data => {
                self.updateData = data;
                self.checkFileIndex = 0;
                self.checkFile(resolve);
            }, () => {
                reject(true);
            }); 
        });
    }
    checkFile(resolveFnc){
        let self = this,
            file = self.updateData.files[self.checkFileIndex];
        self.filesDb.getByFileId(file.fileId)
        .then((oldFile: any) => {
            if(oldFile.filePath === file.filePath && oldFile.fileName === file.fileName) {
                self.setFileWithData(oldFile);
                if(self.checkFileIndex == self.updateData.files.length - 1) {
                    resolveFnc();
                } else {
                    self.checkFileIndex++;
                    self.checkFile(resolveFnc);
                }
            } else {
                self.downloadFile(file)
                .then(() => {
                    if(self.checkFileIndex == self.updateData.files.length - 1) {
                        resolveFnc();
                    } else {
                        self.checkFileIndex++;
                        self.checkFile(resolveFnc);
                    }
                });
            }
        }, () => {
            self.downloadFile(file)
            .then(() => {
                if(self.checkFileIndex == self.updateData.files.length - 1) {
                    resolveFnc();
                } else {
                    self.checkFileIndex++;
                    self.checkFile(resolveFnc);
                }
            });
        });
    }
    downloadFile(file){
        let self = this;
        return new Promise((resolve, reject) => {
            let url = self.baseUrl + (file.filePath.length ?  file.filePath + '/' : '') + file.fileName
            self.http.get(url)
            .subscribe((data) => {
                self.setFileWithData(file, data);
                self.filesDb.set(file, data)
                .then(() => {
                    resolve(true);
                });
            });
        });
    }
    checkDownload(){
        let self = this;
        return new Promise((resolve, reject) => {
            self.makeUpdate()
            .then(() => {
                resolve(true);
            }, () => {
                self.baseUrl = './assets/temp/';
                self.makeUpdate()
                .then(() => {
                    resolve(true);
                });
            });
        });
    }
    setFileWithData(file: any, data?:any){
        let self = this;
        for(let key in self.updateData) {
            if(key !== 'files') {
                if(self.updateData[key] == file.fileId) {
                    if(data) {
                        self.updateData[key] = data;
                    } else {
                        self.updateData[key] = JSON.parse(file.data);
                    }
                }
            }
        }
        console.log('self.updateData ', self.updateData);
    }
}
