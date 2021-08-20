import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBranchComponent } from './manage-branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';


const routes: Routes = [
  { path: "manage-branch", component: ManageBranchComponent },
  { path: "manage-branch/branch/:value", component: AddBranchComponent },
  { path: "manage-branch/view-branch", component: ViewBranchComponent },
  { path: "manage-branch/view-branch/:id", component: ViewBranchComponent },
  { path: "manage-branch/branch/:value/:id", component: AddBranchComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBranchRoutingModule { }
