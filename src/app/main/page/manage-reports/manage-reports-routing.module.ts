import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageReportsComponent } from './manage-reports.component';





const routes: Routes = [
  {
    path:"manage-reports",
    component:ManageReportsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
