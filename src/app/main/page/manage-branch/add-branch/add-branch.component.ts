import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    AfterViewInit,
    NgZone,
} from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { MatRadioModule } from "@angular/material/radio";
import { MapsAPILoader } from "@agm/core";
/* API SERVICE*/

import { ApiserviceService } from "../../../../services/apiservice.service";

@Component({
    selector: "app-add-customer",
    templateUrl: "./add-branch.component.html",
    styleUrls: ["./add-branch.component.scss"],
})
export class AddBranchComponent implements OnInit {
    @ViewChild("search", { static: true }) searchAddElementRef: ElementRef;
    id: any;
    selcectFormOption: any;
    checkSpace: boolean;
    fieldName: any;
    updateEmail: any;
    geoCoder: any;
    latitude: any;
    longitude: any;
    zoom: number = 5;
    form: FormGroup;
    submitted = false;
    address: string;
    email: any[];
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute,
        private apiService: ApiserviceService
    ) {}
    ngOnInit(): void {
        this.ngZone.run(() => {
            this.mapsAPILoader.load().then(() => {
                this.geoCoder = new google.maps.Geocoder();
                this.zoom = 12;
                this.ngZone.run(() => {
                    let autocomplete = new google.maps.places.Autocomplete(
                        this.searchAddElementRef.nativeElement,
                        {}
                    );

                    autocomplete.addListener("place_changed", () => {
                        this.ngZone.run(() => {
                            //get the place result
                            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                            //verify result
                            if (
                                place.geometry === undefined ||
                                place.geometry === null
                            ) {
                                return;
                            }
                            //set latitude, longitude and zoom
                            this.latitude = place.geometry.location.lat();
                            this.longitude = place.geometry.location.lng();
                            this.address = place.formatted_address;
                            let tempcity: any;
                            let temppostal_code: any;
                            let tempcountry: any;
                            let tempstate: any;
                            place.address_components.forEach(function (
                                element2: any
                            ) {
                                element2.types.forEach(function (
                                    element3: any
                                ) {
                                    switch (element3) {
                                        case "postal_code":
                                            temppostal_code =
                                                element2.long_name;
                                            break;
                                        case "administrative_area_level_1":
                                            tempstate = element2.long_name;
                                            break;
                                        case "locality":
                                            tempcity = element2.long_name;
                                            break;
                                        case "country":
                                            tempcountry = element2.short_name;
                                            break;
                                    }
                                });
                            });
                            // this.city = tempcity;
                            // this.state = tempstate;
                            // this.postal_code = temppostal_code;

                            // this.country = tempcountry;
                        });
                    });
                });
            });
        });
        this.id = this.route.snapshot.paramMap.get("id");

        this.selcectFormOption = this.route.snapshot.paramMap.get("value");
        // Get user info from api and bind into form value for edit user
        if (this.selcectFormOption == "edit") {
            this.apiService.viewBranch(this.id).subscribe((response) => {
                if (response["status"] == "OK") {
                    this.form = this._formBuilder.group({
                        branch_code: [
                            response["data"].branch_code,
                            [
                                Validators.required,
                                UsernameValidator.cannotContainSpace,
                            ],
                        ],
                        branch_name: [
                            response["data"].branch_name,
                            [
                                Validators.required,
                                UsernameValidator.cannotContainSpace,
                            ],
                        ],
                        mobile: [
                            response["data"].branch_phone,
                            [
                                Validators.required,
                                Validators.pattern("^[0-9-()s]+"),
                            ],
                        ],
                        email: [
                            response["data"].branch_email,
                            [
                                Validators.required,
                                Validators.email,
                                Validators.pattern(
                                    "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                                ),
                            ],
                        ],
                        address: [
                            response["data"].branch_address,
                            [
                                Validators.required,
                                UsernameValidator.cannotContainSpace,
                            ],
                        ],
                        zipcode: [response["data"].zipcode],
                        branch_desc: [response["data"].branch_description],
                    });
                    (this.latitude = response["data"].latitude),
                        (this.longitude = response["data"].longitude),
                        this.form.controls["email"].disable();
                    this.updateEmail = response["data"].branch_email;
                }
            });
        }
        this.form = this._formBuilder.group({
            // branch_code: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
            branch_name: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            branch_desc: [""],
            mobile: [
                "",
                [Validators.required, Validators.pattern("^[0-9-()s]+")],
            ],
            email: [
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
            zipcode: [""],
        });
    }
    get f() {
        return this.form.controls;
    }
    updateBranch() {
        let send_update_value = {
            // "branch_code": this.form.value.branch_code.trim(),
            branch_name: this.form.value.branch_name.trim(),
            branch_email: this.updateEmail,
            branch_description: this.form.value.branch_desc,
            branch_address: this.form.value.address.trim(),
            latitude: this.latitude,
            longitude: this.longitude,
            branch_phone: this.form.value.mobile,
            zipcode: this.form.value.zipcode,
        };
        if (this.form.valid) {
            this.apiService
                .editBranch(this.id, send_update_value)
                .subscribe((data) => {
                    if (data["status"] == "OK") {
                        this.snackBar.open(
                            "Branch Updated Successfully",
                            "Close",
                            {
                                duration: 2000,
                            }
                        );
                        this.router.navigateByUrl("/manage-branch");
                    } else {
                        this.snackBar.open(
                            "Something wrong unable to update",
                            "Close",
                            {
                                duration: 3000,
                            }
                        );
                    }
                });
        }
        this.submitted = true;
    }
    //type number only validation
    numberOnly(event) {
        var charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57 || event.target.value.length >= 15) {
            if (charCode == 43) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        } else {
            return true;
        }
    }
    public e: any;
    omit_special_char(val) {
        var k;
        document.all ? (k = this.e.keyCode) : (k = this.e.which);
        return (
            (k > 64 && k < 91) ||
            (k > 96 && k < 123) ||
            k == 8 ||
            k == 32 ||
            (k >= 48 && k <= 57)
        );
    }
    createBranch() {
        this.submitted = true;
        let send_branch = {
            // "branch_code": this.form.value.branch_code.trim(),
            branch_name: this.form.value.branch_name.trim(),
            branch_email: this.form.value.email,
            branch_description: this.form.value.branch_desc,
            branch_address: this.form.value.address.trim(),
            latitude: this.latitude,
            longitude: this.longitude,
            branch_phone:"+1"+ this.form.value.mobile,
            zipcode: this.form.value.zipcode,
        };
        if (this.form.valid) {
            this.apiService.createBranch(send_branch).subscribe((res) => {
                if (res["status"] == "ok") {
                    this.snackBar.open("Branch Added Successfully", "Close", {
                        duration: 3000,
                    });
                    this.router.navigateByUrl("/manage-branch");
                } else {
                    this.snackBar.open(res["data"], "Close", {
                        duration: 3000,
                    });
                }
            });
        }
    }
}
export class UsernameValidator {
    static cannotContainSpace(
        control: AbstractControl
    ): ValidationErrors | null {
        var value = control.value.trim();
        if (value == 0) {
            return { cannotContainSpace: true };
        }
        return null;
    }
}
