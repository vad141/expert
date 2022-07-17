import { Injectable } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { LocalStorage } from './localStorage';
import { ToastNotify } from './toast';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
    loadingMask: any;
    alert: any;
    errorDisplayed: boolean = false;
    repeatInterval: number;
    constructor(
        public http: HttpClient,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public localStorage: LocalStorage,
        public navCtrl: NavController,
        public toastNotify: ToastNotify
    ) {
        let self = this;
    }
    getBackendUrl() {
        return 'https://app.epcp.ru/';
    }
    showMask(text) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.beforeShowMask(text).then(() => {
                resolve(true);
            });
        });
    }
    async beforeShowMask(text) {
        let self = this;
        self.loadingMask = await this.loadingCtrl.create({
            mode: 'md',
            spinner: 'lines-small',
            message: text
        });
        await self.loadingMask.present();

    }
    hideMask() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self.loadingMask) {
                self.loadingMask.dismiss()
                .then(() => {
                    resolve(true);
                });
            } else {
                resolve(true);
            }
        });
    }
    async showError(status?: any, errorText?: string, doneFunc: any = () => {}) {
        let self = this;
        if (!self.errorDisplayed) {
            self.alert = await self.alertCtrl.create({
                header: status ? status : 'Ошибка',
                message: errorText ? errorText : 'Произошла ошибка',
                backdropDismiss: false,
                mode: 'md',
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        self.errorDisplayed = false;
                        self.alert.dismiss().then(doneFunc());
                        return false;
                    }
                }]
            });
            if (self.loadingMask && !self.loadingMask._isHidden) {
               self.hideMask()
               .then(() => {
                    self.errorDisplayed = true;
                    self.alert.present();
               });
            } else {
                self.errorDisplayed = true;
                self.alert.present();
            }
        }
    }
    toHttpParams(obj: Object): HttpParams {
        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];
                if (val !== null && val !== undefined) {
                    params = params.append(key, val.toString());
                }
            }
        }
        return params;
    }
    serialize(obj: any) {
        const formData = new FormData();

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let element = obj[key];
                formData.append(key, element);
            }
        }
        return formData;
    }
    doQueryRequest(method: string, endpoint: string, params?: any) {
        let self = this,
            options: any = {};
        return new Promise((resolve, reject) => {
            self.http.request(method, self.getBackendUrl() + endpoint + (params ? '?' + self.toHttpParams(params) : ''), options)
            .pipe(timeout(60000))
            .subscribe(data => {
                resolve(data);
            },
            error => {
                self.hideMask()
                .then(() => {
                    if(error.status === 401) {
                        //self.logout();
                    } else if(error.status == 0) {
                        self.toastNotify.error("Проверьте Ваше Интернет-соединение и повторите попытку.");
                    } else {
                        console.log('api error ', error);
                        self.toastNotify.error(
                            'Ошибка' + ' ' + error.status + '. ' + 
                            (    error.error ? 
                                
                                (
                                    error.error.data ? 
                                    error.error.data : 
                                    (error.error.message ? error.error.message : error.statusText)
                                ) : ''
                            )
                        , 5000);
                    }
                });
            });
        });
    }
    doRequest(method: string, endpoint: string, params?: any) {
        let self = this,
            options: any = {};
        return new Promise((resolve, reject) => {
            self.localStorage.get('auth', false, true)
            .then((user: any) => {
                let headers: any = {};
                if (user && user.token) {
                    headers['Authorization'] = 'Bearer ' + user.token;
                }
                options.body = params;
                options.headers = new HttpHeaders(headers);
                self.http.request(method, self.getBackendUrl() + endpoint, options)
                .pipe(timeout(60000))
                .subscribe(data => {
                    resolve(data);
                },
                error => {
                    self.hideMask()
                    .then(() => {
                        if(error.status === 401) {
                            //self.logout();
                        } else if(error.status === 0) {
                            self.toastNotify.error("Извените, связь с сервером не удалось установить.");
                        } else {
                            console.log('api error ', error);
                            self.toastNotify.error(
                                'Ошибка' + ' ' + error.status + '. ' + 
                                (    error.error ? 
                                    
                                    (
                                        error.error.data ? 
                                        error.error.data : 
                                        (error.error.message ? error.error.message : error.statusText)
                                    ) : ''
                                )
                            , 5000);
                        }
                    });
                });
            });
        });
    }
    doRequestFormData(method: string, endpoint: string, params?: any) {
        let self = this,
            options: any = {};
        console.log('options.url = ' + options.url);
        return new Promise((resolve, reject) => {
            self.localStorage.get('auth', false, true)
            .then((user: any) => {
                let headers: any = {};
                /*headers['Content-Type'] = 'application/x-www-form-urlencoded';*/
                if (user && user.token) {
                    headers['Authorization'] = 'Bearer ' + user.token;
                }
                if (params) {
                    if (method === 'GET') {
                        let p = new URLSearchParams();
                        for (let k in params) {
                            p.set(k, params[k]);
                        }
                        // Set the search field if we have params and don't already have
                        // a search field set in options.
                        options.search = !options.search && p || options.search;
                        // TODO add timestamp to do not cache requests
                    } else {
                        options.body = self.serialize(params)
                    }
                }
                options.headers = new HttpHeaders(headers);
                self.http.request(method, self.getBackendUrl() + endpoint, options)
                .pipe(timeout(60000))
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    self.hideMask()
                    .then(() => {
                         if(error.status === 0) {
                            self.showError('Ошибка', 'Извините! В связи с отсутствием доступа к интернет мобильное приложение не может выполнить ваш запрос.', () => {
                                reject();
                            });
                        } else if(error.status === 401) {
                            // TODO check
                            //self.events.publish('logout');
                        } else if(error.status === 0) {
                            self.toastNotify.error("Извените, связь с сервером не удалось установить.");
                        } else if (error.status === 422) {
                            let message;
                            message = error.json().map((errorObj) => {
                                return errorObj.message;
                            }).join('<br>');
                            if (endpoint !== 'social/login' || (endpoint === 'social/login' && message.indexOf('Вы должны активировать аккаунт') !== -1)) {
                                let title = 'Ошибка';
                                self.showError(title, message, () => {
                                    reject();
                                });
                            } else {
                                console.log('message ', message);
                                reject(true);
                            }
                        } else if (error.status !== 400) {
                            self.log('Api Method Error', error, method, params);
                            self.showError(error.status, error.statusText, () => {
                                reject();
                            });
                        }
                    });
                });
            });
        });
    }

    log(message: string, xhr: any, method: string, params?: any) {
        let err,
            resp,
            xhrMessage = '';
        if (xhr) {
            resp = xhr.statusText || null;
            xhrMessage = ['URL:' + xhr.url,
                'status:' + xhr.status + '(' + xhr.statusText + ')',
                resp ? (' , response: ' + xhr.statusText) : '',
                method === 'POST' ? 'jsonData:' + JSON.stringify(params) : ''].join(' ');
        }
        err = new Error(['ExpertException:', message, xhrMessage].join(' '));
        console.log(err);
    }
}
