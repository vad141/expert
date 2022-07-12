import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SendPage } from './send.page';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule, ComponentsModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SendPage
      }
    ])
  ],
  declarations: [SendPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SendPageModule {}
