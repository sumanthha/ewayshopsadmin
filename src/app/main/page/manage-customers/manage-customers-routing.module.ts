import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCustomersComponent } from './manage-customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


const routes: Routes = [
  { path: "manage-users", component: ManageCustomersComponent },
  { path: "manage-users/user/:value", component: AddCustomerComponent },
  { path: "manage-users/view-user", component: ViewCustomerComponent },
  { path: "manage-users/view-user/:id", component: ViewCustomerComponent },
  { path: "manage-users/user/:value/:id", component: AddCustomerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCustomersRoutingModule { }
