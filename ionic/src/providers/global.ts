import { Injectable }            from '@angular/core';
import { Platform, ActionSheetController }               from '@ionic/angular';
import { InAppBrowser }         from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClient } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Injectable()
export class GlobalService {
    politicsUrl: string = 'https://www.google.com';
    feedbackEmails: Array<string> = ['info@epcp.ru'];
    iosLink: string = 'https://www.ios.link'; //TODO
    androidLink: string = 'https://www.android.link'; //TODO
    appVersionText: string = '1.0.0';
    gitVersion: any;
    constructor (
        public http: HttpClient,
        private appVersion: AppVersion,
        public platform: Platform,
        public iab: InAppBrowser,
        public socialSharing: SocialSharing
    ) {
        let self = this;
        self.platform.ready()
        .then(() => {
            self.initConfig();
        })
    }
    openPolitics(){
        this.openInnerLink(this.politicsUrl);
    }
    openInnerLink(link: string){
        let self = this;
        return new Promise((resolve, reject) => {
            let browser = self.iab.create(
                encodeURI(link),
                '_blank', {
                    hidenavigationbuttons: 'yes',
                    hideurlbar: 'yes',
                    location: 'yes',
                    footer: 'no',
                    toolbarposition: 'top',
                    closebuttoncaption: 'Закрыть',
                    closebuttoncolor: '#000000',
                    zoom: 'no'
            });
            browser.on('loadstart').subscribe(result => {
                console.log('result.url ', result.url);
            });
            browser.on('exit').subscribe(() => {
                resolve(true);
            });
        });
    }
    sendFeedback(data){
        let self = this;
        self.socialSharing.canShareViaEmail().then(() => {
            self.socialSharing.shareViaEmail(data.message, data.subject, self.feedbackEmails);
        }).catch(() => {
          //TODO ?
        });
    }
    shareApp(){
        if(this.platform.is('ios')) {
            this.socialSharing.share(null, null, null, this.iosLink);
        } else {
            this.socialSharing.share(null, null, null, this.androidLink);
        }
    }
    initConfig() {
        let self = this;
        self.http.get('assets/json/git_curr_version.json')
        .subscribe(data => {
            debugger
            self.gitVersion = data;
            if(self.platform.is('cordova')) {
                self.appVersion.getVersionNumber().then(function (version) {
                    self.appVersionText = version;
                });
            }
        });
    }
    getGitVersion() {
        return this.gitVersion.hash.substring(0, 6);
    }
    getAppVersion() {
        return this.appVersionText;
    }
}