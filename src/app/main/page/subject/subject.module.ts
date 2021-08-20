import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';

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
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { EditsubjectComponent } from './editsubject/editsubject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteSubjectComponent } from './delete-dialog-subject/dialog-delete-subject.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [SubjectComponent, AddsubjectComponent, EditsubjectComponent,DialogDeleteSubjectComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SubjectRoutingModule,
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
    SubjectComponent
  ],
  entryComponents:[
    DialogDeleteSubjectComponent
  ]
})
export class SubjectModule { }
