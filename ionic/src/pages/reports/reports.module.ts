import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ReportsPage } from './reports.page';

@NgModule({
  imports: [
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