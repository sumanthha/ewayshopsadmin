import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageOrdersComponent } from './manage-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';



const routes: Routes = [
  { path: "manage-orders", component: ManageOrdersComponent },
  { path: "manage-orders/view-order/:id", component: ViewOrdersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrdersRoutingModule { }
