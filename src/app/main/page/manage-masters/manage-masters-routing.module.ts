import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMastersComponent } from './manage-masters.component';
//CATEGORY
import { CategoriesComponent } from './categories/categories.component';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
// SUB CATEGORY
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddEditComponent } from './sub-categories/add-edit/add-edit.component';
//Mark 
import { MarkComponent } from './mark/mark.component';
import { AddEditMarkComponent } from './mark/add-edit-mark/add-edit-mark.component';
//Size
import { SizeComponent } from './size/size.component';
import { AddEditSizeComponent } from './size/add-edit-size/add-edit-size.component';
//COLOR
import { ColorComponent } from './color/color.component';
import { AddEditColorComponent } from './color/add-edit-color/add-edit-color.component';
//LOCATION
import { LocationsComponent } from './locations/locations.component';
import { AddEditLocationComponent } from './locations/add-edit-location/add-edit-location.component';


const routes: Routes = [
  { path: "manage-masters", component: ManageMastersComponent },
  //CATEGORY
  { path: 'manage-masters/categories', component: CategoriesComponent },
  { path: 'manage-masters/categories/:value', component: AddEditCategoryComponent },
  { path: 'manage-masters/categories/:value/:id', component: AddEditCategoryComponent },
  //SUB CATEGORY
  { path: 'manage-masters/sub-categories', component: SubCategoriesComponent },
  { path: 'manage-masters/sub-categories/:value', component: AddEditComponent },
  { path: 'manage-masters/sub-categories/:value/:id', component: AddEditComponent },
  //MARK
  { path: 'manage-masters/mark', component: MarkComponent },
  { path: 'manage-masters/mark/:value', component: AddEditMarkComponent },
  { path: 'manage-masters/mark/:value/:id', component: AddEditMarkComponent },
  //SIZE
  { path: 'manage-masters/size', component: SizeComponent },
  { path: 'manage-masters/size/:value', component: AddEditSizeComponent },
  { path: 'manage-masters/size/:value/:id', component: AddEditSizeComponent },
  //COLOR
  { path: 'manage-masters/color', component: ColorComponent },
  { path: 'manage-masters/color/:value', component: AddEditColorComponent },
  { path: 'manage-masters/color/:value/:id', component: AddEditColorComponent },
  //LOCATION
  { path: 'manage-masters/locations', component: LocationsComponent },
  { path: 'manage-masters/locations/:value', component: AddEditLocationComponent },
  { path: 'manage-masters/locations/:value/:id', component: AddEditLocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMastersRoutingModule { }
