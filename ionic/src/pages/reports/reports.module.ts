import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportsPage } from './reports.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsPage
      }
    ])
  ],
  declarations: [ReportsPage],
  schemas: []
})
export class ReportsPageModule {}