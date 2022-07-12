import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ReportEditPage } from './edit.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule, ComponentsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportEditPage
      }
    ])
  ],
  declarations: [ReportEditPage],
  schemas: []
})
export class ReportEditPageModule {}