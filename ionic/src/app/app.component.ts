import { Component, enableProdMode } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import {
    DbProvider,
} from '../providers/providers';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor (
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private db: DbProvider,
        public navCtrl: NavController,
        private keyboard: Keyboard,
	) {
		this.initializeApp();
	}
	backButtonEventFired(){
		console.log('backButtonEventFired'); //TODO
	}
    initializeApp() {
        let self = this;
        self.platform.ready()
        .then(() => {
            let viewport = document.querySelector("meta[name=viewport]");
            if(self.platform.is('ios')) {
                //viewport.setAttribute('content', 'user-scalable=no, width=375, viewport-fit=cover, maximum-scale=' + screen.width / 375);
            } else {
                viewport.setAttribute('content', 'user-scalable=no, width=375, viewport-fit=cover, maximum-scale=' + screen.width / 375 + ', initial-scale=' + screen.width / 375);
            }
            self.platform.backButton.subscribeWithPriority(999999,  () => {
                self.backButtonEventFired();
            });
            self.keyboard.onKeyboardWillShow().subscribe((event: any) => {
                setTimeout(() => {
                    document.body.classList.add('keyboard-is-open');
                    /*if(document.querySelector('.chat-footer')) {
                        if(self.platform.is('ios')) {
                            (<HTMLElement>document.querySelector('.chat-footer')).style.marginBottom = event.keyboardHeight + 'px';
                        }
                    }*/
                }, 300);
            });
            self.keyboard.onKeyboardWillHide().subscribe(() => {
                setTimeout(() => {
                    document.body.classList.remove('keyboard-is-open');
                    /*if(document.querySelector('.chat-footer')) {
                        if(self.platform.is('ios')) {
                            (<HTMLElement>document.querySelector('.chat-footer')).style.marginBottom = '0';
                        }
                    }*/
                }, 300);
            });

            self.db.initDB()
            .then(() => {
        		self.navCtrl.navigateRoot('reports');                
                setTimeout(() => {
                    if(self.platform.is('cordova')) {
                        if(self.platform.is('ios')) {
                            self.statusBar.styleDefault();
                        } else {
                            self.statusBar.styleBlackOpaque();
                        }
                        self.splashScreen.hide();
                    }
                }, 1000);
            });
        });
    }
}
//enableProdMode(); //TODO
