import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBranchManagerComponent } from './manage-branchmanager.component';
import { AddBranchManagerComponent } from './add-branchmanager/add-branchmanager.component';
import { ViewBranchManagerComponent } from './view-branchmanager/view-branchmanager.component';


const routes: Routes = [
  { path: "manage-branchmanager", component: ManageBranchManagerComponent },
  { path: "manage-branchmanager/branch/:value", component: AddBranchManagerComponent },
  { path: "manage-branchmanager/view-branchmanager", component: ViewBranchManagerComponent },
  { path: "manage-branchmanager/view-branchmanager/:id", component: ViewBranchManagerComponent },
  { path: "manage-branchmanager/branch/:value/:id", component: AddBranchManagerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBranchManagerRoutingModule { }
