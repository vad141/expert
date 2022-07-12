import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'reports',
  loadChildren: () => import('../pages/reports/reports.module').then( m => m.ReportsPageModule)
}, {
  path: 'reports/:type/:reportId',
  loadChildren: () => import('../pages/reports/edit/edit.module').then( m => m.ReportEditPageModule)
}, {
  path: 'tables/:type/:reportId',
  loadChildren: () => import('../pages/tables/tables.module').then( m => m.TablesPageModule)
}, {
  path: 'send/:type/:reportId',
  loadChildren: () => import('../pages/send/send.module').then( m => m.SendPageModule)
}, {
  path: 'tables/:type/:reportId/:tableId',
  loadChildren: () => import('../pages/tables/edit/edit.module').then( m => m.TableEditPageModule)
}, {
  path: 'feedback',
  loadChildren: () => import('../pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
}, {
  path: 'personal',
  loadChildren: () => import('../pages/personal/personal.module').then( m => m.PersonalPageModule)
}, {
  path: 'faq',
  loadChildren: () => import('../pages/faq/faq.module').then( m => m.FaqPageModule)
}, {
  path: 'info',
  loadChildren: () => import('../pages/info/info.module').then( m => m.InfoPageModule)
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
