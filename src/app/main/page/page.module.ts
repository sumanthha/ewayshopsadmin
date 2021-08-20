import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { SubjectModule } from './subject/subject.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';


import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';




import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ProfileModule } from './profile/profile.module';

// NEW COMPONENT IMPORT 
// import { ManageVendorModule } from './manage-vendor/mange-vendor.module';
import { ManageCustomersModule } from './manage-customers/mange-customers.module';
import { ManageOrdersModule } from './manage-orders/mange-orders.module';
import { ManageReportsModule } from './manage-reports/mange-reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManageMastersModule } from './manage-masters/manage-masters.module';
import { ManagePaymentsModule } from './manage-payments/mange-payments.module'
import { ManageCommissionModule } from './manage-commission/mange-commission.module';
import { ManageBranchModule } from './manage-branch/mange-branch.module';
import {ManageBranchManagerModule} from './manage-branchmanager/mange-branchManager.module'
import { ApiserviceService } from '../../services/apiservice.service';
import { DatePipe } from '@angular/common';









@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    SubjectModule,
    ManageCustomersModule,
    ManageOrdersModule,
    ManageReportsModule,
    ManageMastersModule,
    ManagePaymentsModule,
    ManageCommissionModule,
    DashboardModule,
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
    NgxPaginationModule,
    FuseSharedModule,
    FuseWidgetModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    ProfileModule,
    MatDatepickerModule,
    ManageBranchModule,
    ManageBranchManagerModule
  ],
  providers: [ApiserviceService, DatePipe]
})
export class PageModule { }
