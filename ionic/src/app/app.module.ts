import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import {
    ToastNotify,
    Api,
    ConstantProvider,
    DbProvider,
    GlobalService,
    LocalStorage
} from '../providers/providers';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
      mode: 'ios',
      rippleEffect: false
    }), AppRoutingModule],
  providers: [{
  	provide: RouteReuseStrategy,useClass: IonicRouteStrategy
  },
    SQLite,
    SplashScreen,
    StatusBar,
    Keyboard,
    ToastNotify,
    Api,
    ConstantProvider,
    DbProvider,
    GlobalService,
    LocalStorage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
