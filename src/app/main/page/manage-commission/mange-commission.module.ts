import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManageCommissionRoutingModule } from './manage-commission-routing.module';
import {ManageBranchComponent } from './manage-commission.component';
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
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {
//   NgMultiSelectDropDownModule
// } from 'ng-multiselect-dropdown';
import {NgMultiSelectDropDownModule }from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddCommissionComponent } from './add-commission/add-commission.component';
import { DeleteCommissionComponent } from './delete-commission/delete-commission.component';
import { ViewCommissionComponent } from './view-commission/view-commission.component';
//IMPORT INNER COMPONENT MODULE

 

@NgModule({
  declarations: [ManageBranchComponent ,AddCommissionComponent,DeleteCommissionComponent, ViewCommissionComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    ManageCommissionRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule,
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
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
  ],
  schemas:[
      CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    ManageBranchComponent,
    MatFormFieldModule, MatInputModule
  ],
  entryComponents:[
    
  ]
})
export class ManageCommissionModule { }
