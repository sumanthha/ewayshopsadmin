import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from '../../../services/apiservice.service';



@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    private accesstoken;
    private emailid;
    public btndisabled = true;
    public userid: any;
    password;
    show = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
     
        this.password = "password"
        this.route.params.subscribe(paramsId => {
        this.accesstoken = paramsId.id;
           
        });
        this.resetPasswordForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    showPass() {
        if (this.password == "password") {
            this.password = "text";
            this.show = true;

        } else {
            this.password = "password";
            this.show = false;
        }
    }

    reset_password() {
    
        //if (this.resetPasswordForm.valid) {
        const data = new FormData();
        data.append('password', this.resetPasswordForm.get('password').value);
        data.append('jwt_token', this.accesstoken)
        this.apiService.resetPassword(data).subscribe(

            (response) => {
                if (response['status'] == "ok") {
                    this.router.navigate(['/auth/login']);
                    this.snackBar.open("Your password has been successfully reset", "Close", {
                        duration: 5000,
                        verticalPosition: 'top'
                    })

                } else {
                    this.snackBar.open("Password could not be reset", "Close", {
                        duration: 4000,
                        verticalPosition: 'top'
                    })
                }

            }, (error) => {
                this.snackBar.open("Password could not be reset", "Close", {
                    duration: 4000,
                    verticalPosition: 'top'
                })
            }

        )
        //}

    }

    password_match() {
        if (this.resetPasswordForm.value.password == this.resetPasswordForm.value.passwordConfirm) {
            this.btndisabled = false;

        }
        else {
            this.btndisabled = true;
        }
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;


    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;


    }

    if (passwordConfirm.value === '') {
        return null;

    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
