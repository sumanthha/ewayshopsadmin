import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManageBranchManagerRoutingModule } from './manage-branchmanager-routing.module';
import {ManageBranchManagerComponent } from './manage-branchmanager.component';
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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { AddBranchManagerComponent } from './add-branchmanager/add-branchmanager.component';
import { DeleteBranchManagerComponent } from './delete-branchmanager/delete-branchmanager.component';
import { ViewBranchManagerComponent } from './view-branchmanager/view-branchmanager.component';
//IMPORT INNER COMPONENT MODULE

 

@NgModule({
  declarations: [ManageBranchManagerComponent ,AddBranchManagerComponent,DeleteBranchManagerComponent, ViewBranchManagerComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    ManageBranchManagerRoutingModule,
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
    MatSlideToggleModule,
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
    ManageBranchManagerComponent,
    MatFormFieldModule, MatInputModule
  ],
  entryComponents:[
    
  ]
})
export class ManageBranchManagerModule { }
