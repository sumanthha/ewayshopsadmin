import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
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
    templateUrl: "./add-branchmanager.component.html",
    styleUrls: ["./add-branchmanager.component.scss"],
})
export class AddBranchManagerComponent implements OnInit {
    @ViewChild("search", { static: true }) searchAddElementRef: ElementRef;
    id: any;
    selcectFormOption: any;
    checkSpace: boolean;
    fieldName: any;
    updateEmail: any;
    updateLat: any;
    updateLong: any;
    geoCoder: any;
    latitude: any;
    longitude: any;
    zoom: number = 5;
    address: string;
    form: FormGroup;
    submitted = false;
    selectedBranch: any;
    Branch_list: any = [];
    password;

    show = false;
    passwords: boolean = true;
    select_branchname: any[];
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private apiService: ApiserviceService,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader
    ) {}

    ngOnInit(): void {
        this.password = "password";
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
        this.apiService.listBranch().subscribe((response) => {
            if (response["status"] == "OK") {
                response["data"].forEach((item, index) => {
                    let obj = {
                        branch_code: item["branch_code"],
                        branch_name: item["branch_name"],
                    };
                    this.Branch_list.push(obj);
                });
            }
        });
        this.id = this.route.snapshot.paramMap.get("id");

        this.selcectFormOption = this.route.snapshot.paramMap.get("value");
        // Get user info from api and bind into form value for edit user
        if (this.selcectFormOption == "edit") {
            this.apiService.viewBranchManager(this.id).subscribe((response) => {
                if (response["status"] == "OK") {
                    this.form = this._formBuilder.group({
                        // branchmanager_code: [response['data'].profile_code, [Validators.required]],
                        branch_name: [
                            response["data"]["branch"][0].branch_code,
                            [Validators.required],
                        ],
                        manager_fname: [
                            response["data"].first_name,
                            [Validators.required],
                        ],
                        manager_lname: [
                            response["data"].last_name,
                            [Validators.required],
                        ],
                        mobile: [
                            response["data"].phone_number,
                            [Validators.required],
                        ],
                        email: [
                            response["data"].email,
                            [Validators.required, Validators.email],
                        ],
                        address: [
                            response["data"].address,
                            [Validators.required],
                        ],
                        // gender: [response['data'].gender, [Validators.required]],
                        // landmark: [
                        //     response["data"].landmark,
                        //     [Validators.required],
                        // ],
                        // id: response['data'].id,
                    });
                    this.selectedBranch =
                        response["data"]["branch"][0].branch_code;
                    this.select_branchname =
                        response["data"]["branch"][0].branch_name;
                    this.form.controls["email"].disable();
                    this.updateEmail = response["data"].email;
                    this.updateLat = response["data"].latitude;
                    this.updateLong = response["data"].longitude;
                    this.passwords = false;
                }
            });
        }
        this.form = this._formBuilder.group({
            // branchmanager_code: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
            branch_name: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            manager_fname: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            manager_lname: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            password: ["", [Validators.required]],
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
            // gender: [''],
            address: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            landmark: [""],
        });
    }
    get f() {
        return this.form.controls;
    }

    updateBranchManager() {
        let send_update_value = {
            id: this.form.value.id,
            // "profile_code": this.form.value.branchmanager_code,
            branch_name: this.select_branchname,
            address: this.form.value.address,
            phone_number: this.form.value.mobile,
            first_name: this.form.value.manager_fname,
            last_name: this.form.value.manager_lname,
            landmark: "",
            // "gender": this.form.value.gender,
            email: this.updateEmail,
            longitude: this.updateLong,
            latitude: this.updateLat,
        };

        if (this.form.valid) {
            this.apiService
                .editBranchManager(this.id, send_update_value)
                .subscribe((data) => {
                    if (data["status"] == "ok") {
                        this.snackBar.open(
                            "Branch Manager Updated successfully",
                            "Close",
                            {
                                duration: 2000,
                            }
                        );
                        this.router.navigateByUrl("/manage-branchmanager");
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
    showPass() {
        if (this.password == "password") {
            this.password = "text";
            this.show = true;
        } else {
            this.password = "password";
            this.show = false;
        }
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
    createBranchManager() {
        this.submitted = true;
        if (this.latitude == undefined) {
            this.latitude = "";
        }
        if (this.longitude == undefined) {
            this.longitude = "";
        }
        let send_branchmanager = {
            // "profile_code": this.form.value.branchmanager_code.trim(),
            branch_code: this.form.value.branch_name.trim(),
            email: this.form.value.email,
            password: this.form.value.password,
            address: this.form.value.address.trim(),
            first_name: this.form.value.manager_fname,
            last_name: this.form.value.manager_lname,
            phone_number: "+1" + this.form.value.mobile,
            landmark: "",
            group: "store",
            // 'gender':this.form.value.gender,
            latitude: this.latitude,
            longitude: this.longitude,
        };

        if (this.form.valid) {
            this.apiService
                .createBranchManager(send_branchmanager)
                .subscribe((res) => {
                    if (res["status"] == "ok") {
                        this.snackBar.open(
                            "Branch Manager Added successfully",
                            "Close",
                            {
                                duration: 3000,
                            }
                        );
                        this.router.navigateByUrl("/manage-branchmanager");
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
        var value = control.value;
        if (value == 0) {
            return { cannotContainSpace: true };
        }
        return null;
    }
}
