import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectComponent } from './subject.component';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { EditsubjectComponent } from './editsubject/editsubject.component';


const routes: Routes = [
  {
    path:"subject",
    component:SubjectComponent
  },
  {
    path:"subject/add",
    component:AddsubjectComponent
  },
  {
    path:"subject/edit/:id",
    component:EditsubjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
