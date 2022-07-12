import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PersonalPage } from './personal.page';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule, ComponentsModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonalPage
      }
    ])
  ],
  declarations: [PersonalPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PersonalPageModule {}
