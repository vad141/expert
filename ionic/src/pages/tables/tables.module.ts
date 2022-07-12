import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablesPage } from './tables.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TablesPage
      }
    ])
  ],
  declarations: [TablesPage],
  schemas: []
})
export class TablesPageModule {}