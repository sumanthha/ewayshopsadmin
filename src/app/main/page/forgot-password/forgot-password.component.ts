import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiserviceService } from '../../../services/apiservice.service';



@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private apiService: ApiserviceService

    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.apiService.getAuthenticatedUser()) {
            this.router.navigate(['/manage-customers'])

        }
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


    Send_reset_link() {
        let mail = this.forgotPasswordForm.value.email;
        let formData: FormData = new FormData();
        formData.append('email', mail);

        this.apiService.Reset_link(formData).subscribe(

            (response) => {
                if (response['status'] == "ok") {
                    this.snackBar.open("Reset Link sent to your e-mail", "Close", {
                        duration: 4000,
                        verticalPosition: 'top'
                    });
                    this.router.navigateByUrl('auth/login');
                } else {
                    this.snackBar.open("Please enter registered mail address", "Close", {
                        duration: 4000,
                        verticalPosition: 'top'
                    })
                }
            }, (error) => {
                this.snackBar.open("Sorry,not able to send reset link", "Close", {
                    duration: 4000,
                    verticalPosition: 'top'
                })
            }
        )
    }
}
