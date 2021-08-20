import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBranchComponent } from './manage-commission.component';
import { AddCommissionComponent } from './add-commission/add-commission.component';
import { ViewCommissionComponent } from './view-commission/view-commission.component';


const routes: Routes = [
  { path: "manage-commission", component: ManageBranchComponent },
  { path: "manage-commission/commission/:value", component: AddCommissionComponent },
  { path: "manage-commission/view-commission", component: ViewCommissionComponent },
  { path: "manage-commission/view-commission/:id", component: ViewCommissionComponent },
  { path: "manage-commission/commission/:value/:id", component: AddCommissionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCommissionRoutingModule { }
