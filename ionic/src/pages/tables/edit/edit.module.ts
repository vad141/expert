import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableEditPage } from './edit.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, ComponentsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TableEditPage
      }
    ])
  ],
  declarations: [TableEditPage],
  schemas: []
})
export class TableEditPageModule {}