import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPasswordComponent } from 'app/main/page/reset-password/reset-password.component';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const routes = [
    {
        path     : 'auth/reset-password',
        component: ResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ResetPasswordRoutingModule,	
        FuseSharedModule,
        MatSnackBarModule
    ]
})
export class ResetPasswordModule
{
}
