import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastNotify {
    toast: any;
    constructor(
        public toastCtrl: ToastController
    ) {
    }
    success(message: string, duration: number = 3000) {
        let self = this,
            time = 0;
        if (self.toast) {
            self.toast.dismiss();
            self.toast = null;
            time = 500;
        }
        setTimeout(() => {
            self.doShow(message, 'success', duration);
        }, time);
    }
    error(message: string, duration: number = 3000) {
        let self = this,
            time = 0;
        if (self.toast) {
            self.toast.dismiss();
            self.toast = null;
            time = 500;
        }
        setTimeout(() => {
            self.doShow(message, 'failure', duration);
        }, time);
    }
    async doShow(message, cssClass, duration) {
        let self = this;
        self.toast = await self.toastCtrl.create({
            mode: 'md',
            message: message,
            duration: duration,
            cssClass: cssClass,
            position: 'top'
        });
        self.toast.present();
        self.toast.onDidDismiss(() => {
            self.toast = null;
        });
    }
}
