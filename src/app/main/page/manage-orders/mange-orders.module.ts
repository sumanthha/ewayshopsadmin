import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import { ManageOrdersComponent } from './manage-orders.component';


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

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { ViewOrdersComponent } from './view-orders/view-orders.component';



@NgModule({
  declarations: [ManageOrdersComponent, ViewOrdersComponent,  ],
  imports: [
    CommonModule,
    MatIconModule,
    ManageOrdersRoutingModule,
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
  schemas:[
      CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    ManageOrdersComponent
  ],
  entryComponents:[
    
  ]
})
export class ManageOrdersModule { }
