import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { ProfileService } from "../profile/profile.service";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { ApiserviceService } from "../../../services/apiservice.service";
import * as S3 from "aws-sdk/clients/s3";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../login/user.service";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {
    public identity;
    form: FormGroup;

    validPassword: any = true;
    imgType: boolean = true;
    filename: string = null;
    submit: any;
    id: any;
    imgUrl: string;
    selectedFile: File;
    profileData: any;
    address: any;
    landmark: any;
    f_name: any;
    l_name: any;
    email: any;
    phone: any;
    profile_pic: any;
    profile_name: any;

    constructor(
        public profileService: ProfileService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private apiService: ApiserviceService,
        private snackBar: MatSnackBar,
        private profile: UserService,
        private uiLoader: NgxUiLoaderService
    ) {
        this.form = this._formBuilder.group({
            // password: ['', Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')],
            // cnfpass: ['', Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')],
            first_name: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            last_name: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            phone: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$"),
                ],
            ],
            emailid: [
                "",
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                    ),
                ],
            ],
            address: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            profile_pic: [""],
            landmark: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
        });
    }
    ProfileList: Object;
    Profile_username: any;
    Profile_email: any;

    ngOnInit() {
        this.apiService.adminProfile().subscribe((res) => {
            if (res["status"] == "OK") {
                this.profileData = res["data"];
                //    this.profile_pic = this.profileData.photo.replace("https://maligai-sheet.s3.amazonaws.com/", "");
            }
            this.form = this._formBuilder.group({
                first_name: [
                    this.profileData.first_name,
                    [Validators.required, UsernameValidator.cannotContainSpace],
                ],
                last_name: [
                    this.profileData.last_name,
                    [Validators.required, UsernameValidator.cannotContainSpace],
                ],
                phone: [
                    this.profileData.phone_number,
                    [Validators.required, Validators.pattern("^[0-9-()s]+")],
                ],
                emailid: [
                    this.profileData.email,
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(
                            "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                        ),
                    ],
                ],
                address: [
                    this.profileData.address,
                    [Validators.required, UsernameValidator.cannotContainSpace],
                ],
                profile_pic: [this.profile_pic],
                landmark: [
                    this.profileData.landmark,
                    [Validators.required, UsernameValidator.cannotContainSpace],
                ],
            });
            this.id = this.profileData.id;
            this.f_name = this.profileData.first_name;
            this.l_name = this.profileData.last_name;
            this.address = this.profileData.address;
            this.landmark = this.profileData.landmark;
            this.email = this.profileData.email;
            this.phone = this.profileData.phone_number;

            if (this.profileData.photo != "") {
                this.profile_pic = this.profileData.photo;
                this.profile_name = this.profileData.photo;
            } else {
                this.profile_pic = "assets/images/avatars/profile.jpg";
                this.profile_name = this.profileData.photo;
            }
            // this.profile_pic = localStorage.setItem('profilePic', this.profileData.photo);
        });
    }
    get f() {
        return this.form.controls;
    }

    //file choose control

    onFileSelect(event) {
        this.selectedFile = <File>event.target.files[0];
        if (
            event.target.files[0].type === "image/jpeg" ||
            event.target.files[0].type === "image/png" ||
            event.target.files[0].type === "image/jpg"
        ) {
            this.imgType = true;
            this.ew_method(this.selectedFile);
        } else {
            this.imgType = false;
        }
    }

    //File Upload AWS  S3
    ew_method(name) {
        // this.uiLoader.start();
        this.checkImage();
        var self = this;
        const bucket = new S3({
            accessKeyId: "",
            secretAccessKey: "",
            region: "us-east-1",
        });
        const contentType = name.type;
        const params = {
            Bucket: "",
            Key: name.name,
            Body: name,
            ACL: "public-read",
            ContentType: contentType,
        };
        bucket.upload(params, function (err, data) {
            if (err) {
                return false;
            } else {
                self.imgUrl = data.Location;
                return true;
            }
        });
    }
    checkImage() {
        if (!this.imgUrl) {
            this.uiLoader.start();
            setTimeout(() => {
                this.checkImage();
            }, 2000);
        } else
            setTimeout(() => {
                this.uiLoader.stop();
            }, 100);
    }
    cancelProfile() {
        this.router.navigate(["/dashboard"]);
    }
    updateProfile() {
        let country_code = "+1";
        this.submit = true;
        var data = {
            photo: this.imgUrl,
            first_name: this.f_name,
            last_name: this.l_name,
            address: this.address,
            landmark: this.landmark,
            email: this.email,
            phone_number: country_code + this.phone,
            gender: "",
            group: "",
            password: "",
        };
        if (!this.imgUrl || this.imgUrl == "undefined") {
            this.imgUrl = this.profileData.photo;
        }
        if (this.form.valid && this.imgUrl) {
            this.apiService
                .adminProfileUpdate(this.id, data)
                .subscribe((res) => {
                    if (res["status"] == "OK") {
                        localStorage.setItem(
                            "profileName",
                            this.f_name + " " + this.l_name
                        );
                        if (this.imgUrl) {
                            localStorage.setItem("profilePic", this.imgUrl);
                        }
                        this.profile.updateIdentity(
                            localStorage.getItem("profilePic"),
                            localStorage.getItem("profileName")
                        );
                        this.profile_pic = localStorage.getItem("profilePic");
                        this.ngOnInit();
                        this.snackBar.open(res["message"], "Close", {
                            duration: 3000,
                        });
                        // this.router.navigate(['/pages/profile']);
                    } else {
                        this.snackBar.open(res["message"], "Close", {
                            duration: 3000,
                        });
                    }
                });
        }
    }

    //type number only validation
    numberOnly(event) {
        var charCode = event.which ? event.which : event.keyCode;
        // Only Numbers 0-9
        if (charCode < 48 || charCode > 57 || event.target.value.length >= 15) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }
}
export class UsernameValidator {
    static cannotContainSpace(
        control: AbstractControl
    ): ValidationErrors | null {
        if (control.value) {
            var value = control.value.trim();
        }
        if (value == 0) {
            return { cannotContainSpace: true };
        }
        return null;
    }
}
