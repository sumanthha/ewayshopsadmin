import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePaymentsComponent } from './manage-payments.component';
import { AddPaymentsComponent } from './add-payments/add-payments.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';


const routes: Routes = [
  { path: "manage-payments", component: ManagePaymentsComponent },
  { path: "manage-payments/payments/:value", component: AddPaymentsComponent },
  { path: "manage-payments/view-payments", component: ViewPaymentsComponent },
  { path: "manage-payments/view-payments/:id", component: ViewPaymentsComponent },
  { path: "manage-payments/payments/:value/:id", component: AddPaymentsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePaymentsRoutingModule { }
