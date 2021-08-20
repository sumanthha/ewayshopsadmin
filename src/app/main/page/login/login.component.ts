import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { ApiserviceService } from "../../../services/apiservice.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../../page/login/user.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    password;
    show = false;
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private loginService: ApiserviceService,
        private router: Router,
        private snackBar: MatSnackBar,
        private profile: UserService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }
    ngOnInit(): void {
        if (this.loginService.getAuthenticatedUser) {
            this.router.navigate(["/dashboard"]);
        }
        this.password = "password";
        this.loginForm = this._formBuilder.group({
            username: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                    ),
                ],
            ],
            password: ["", Validators.required],
        });
    }
    //Forgot password page redirection function
    forgotPwd() {
        this.router.navigate(["/forgot-password"]);
    }
    //Password hide and show function
    showPass() {
        if (this.password == "password") {
            this.password = "text";
            this.show = true;
        } else {
            this.password = "password";
            this.show = false;
        }
    }
    //Login function
    loginFn() {
        const formData = new FormData();
        formData.append("email", this.loginForm.value.username);
        formData.append("password", this.loginForm.value.password);
        this.loginService.loginAccount(formData).subscribe(
            (response) => {
                if (
                    response["role"] == "superuser" &&
                    response["status"] == "ok"
                ) {
                    localStorage.setItem(
                        "username",
                        this.loginForm.value.username
                    );
                    localStorage.setItem("accessToken", response["access"]);
                    localStorage.setItem("refreshToken", response["refresh"]);
                    this.loginService.adminProfile().subscribe((res) => {
                        if (res["status"] == "OK" && res["status"]) {
                            if (res["data"].photo) {
                                localStorage.setItem(
                                    "profilePic",
                                    res["data"].photo
                                );
                            } else {
                                localStorage.setItem(
                                    "profilePic",
                                    "assets/images/avatars/profile.jpg"
                                );
                            }

                            let userName =
                                res["data"].first_name +
                                " " +
                                res["data"].last_name;
                            localStorage.setItem("profileName", userName);
                            let pic = localStorage.getItem("profilePic");
                            let name = localStorage.getItem("profileName");
                            this.profile.updateIdentity(pic, name);
                            this.router.navigate(["/dashboard"]);
                        }
                    });
                } else if (
                    response["role"] == "store" &&
                    response["status"] == "ok"
                ) {
                    this.snackBar.open(
                        "Store owner Cant able to login",
                        "Close",
                        {
                            duration: 4000,
                            verticalPosition: "top",
                        }
                    );
                } else if (
                    response["role"] == "customer" &&
                    response["status"] == "ok"
                ) {
                    this.snackBar.open(
                        "Store owner Cant able to login",
                        "Close",
                        {
                            duration: 4000,
                            verticalPosition: "top",
                        }
                    );
                } else {
                    this.snackBar.open(response["message"], "Close", {
                        duration: 4000,
                        verticalPosition: "top",
                    });
                }

                //this.loginForm.reset();
            },
            (error) => {
                this.snackBar.open(error.error.detail, "Close", {
                    duration: 4000,
                    verticalPosition: "top",
                });
            }
        );
    }
}
