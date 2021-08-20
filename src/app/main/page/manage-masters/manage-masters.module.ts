import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManageMastersRoutingModule } from "./manage-masters-routing.module";
import { ManageMastersComponent } from './manage-masters.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { MarkComponent } from './mark/mark.component';
import { SizeComponent } from './size/size.component';
import { ColorComponent } from './color/color.component';
import { LocationsComponent } from './locations/locations.component';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
import { DeleteCategoriesComponent} from './categories/delete-category/delete-categories.component';
import { DeleteSubCategoriesComponent} from './sub-categories/delete-subcategory/delete-subcategories.component'
import { AddEditComponent } from './sub-categories/add-edit/add-edit.component';
import { AddEditMarkComponent } from './mark/add-edit-mark/add-edit-mark.component';
import { AddEditSizeComponent } from './size/add-edit-size/add-edit-size.component';
import { AddEditColorComponent } from './color/add-edit-color/add-edit-color.component';
import { AddEditLocationComponent } from './locations/add-edit-location/add-edit-location.component';



//IMPORT INNER COMPONENT MODULE



@NgModule({
  declarations: [ManageMastersComponent,DeleteSubCategoriesComponent, CategoriesComponent, SubCategoriesComponent, MarkComponent, SizeComponent, ColorComponent, LocationsComponent, AddEditCategoryComponent, AddEditComponent, AddEditMarkComponent, AddEditSizeComponent, AddEditColorComponent, AddEditLocationComponent,DeleteCategoriesComponent],
  imports: [
    CommonModule,

    MatIconModule,
    ManageMastersRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ManageMastersComponent

  ],
  entryComponents: [

  ]
})
export class ManageMastersModule { }
