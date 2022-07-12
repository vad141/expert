import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { InAppBrowser }         from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraMock } from '../mocks/camera';

import { ComponentsModule } from '../components/components.module';

import { AddReportModal } from "../modal/addReport/addReport.page";
import { DictionaryPopover } from "../modal/dictionary/dictionary.page";
import { CropperModal } from "../modal/cropper/cropper.page";

import { AngularCropperjsModule } from 'angular-cropperjs';


import {
    DictionaryStorage,
    Events,
    TablesDb,
    ReportsDb,
    FilesDb,
    ToastNotify,
    Api,
    ConstantProvider,
    DbProvider,
    GlobalService,
    Download,
    LocalStorage
} from '../providers/providers';

@NgModule({
  declarations: [AppComponent, AddReportModal, DictionaryPopover, CropperModal],
  entryComponents: [AddReportModal, DictionaryPopover, CropperModal],
  imports: [
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    ComponentsModule,
    AngularCropperjsModule,
    IonicModule.forRoot({
      mode: 'ios',
      rippleEffect: false
    }), AppRoutingModule],
  providers: [{
  	provide: RouteReuseStrategy,useClass: IonicRouteStrategy
  },
    Camera,
    /*{
      provide: Camera,
      useClass: CameraMock
    },*/
    DictionaryStorage,
    AppVersion,
    SocialSharing,
    InAppBrowser,
    TablesDb,
    Events,
    ReportsDb,
    FilesDb,
    SQLite,
    SplashScreen,
    StatusBar,
    Keyboard,
    Download,
    ToastNotify,
    Api,
    ConstantProvider,
    DbProvider,
    GlobalService,
    LocalStorage
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
