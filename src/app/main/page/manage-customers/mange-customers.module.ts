import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManageCustomersRoutingModule } from './manage-customers-routing.module';
import {ManageCustomersComponent } from './manage-customers.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
//IMPORT INNER COMPONENT MODULE

 

@NgModule({
  declarations: [ManageCustomersComponent ,AddCustomerComponent,DeleteCustomerComponent, ViewCustomerComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    ManageCustomersRoutingModule,
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
    NgxPaginationModule,MatDatepickerModule,
    MatRadioModule
  ],
  schemas:[
      CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    ManageCustomersComponent,
    MatFormFieldModule, MatInputModule
  ],
  entryComponents:[
    
  ]
})
export class ManageCustomersModule { }
