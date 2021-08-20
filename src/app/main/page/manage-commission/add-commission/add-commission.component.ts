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
    templateUrl: "./add-commission.component.html",
    styleUrls: ["./add-commission.component.scss"],
})
export class AddCommissionComponent implements OnInit {
    @ViewChild("search", { static: true }) searchAddElementRef: ElementRef;
    id: any;
    selcectFormOption: any;
    checkSpace: boolean;
    fieldName: any;
    updateEmail: any;
    geoCoder: any;
    latitude: number;
    longitude: number;
    zoom: number = 5;
    form: FormGroup;
    submitted = false;
    address: string;
    branch_list: any = [];
    commisionper: any = "2";
    selectedCategory: any;
    branches: Array<any> = [];
    branch: any;
    limitSelection = false;
    selectedItems: Array<any> = [];
    dropdownSettings: any = {};
    selectedStore_Data: any[];
    selected: any;
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
        this.branch = "";
        this.form = this._formBuilder.group({
            commission_percentage: "2",
        });
        this.id = this.route.snapshot.paramMap.get("id");

        this.selcectFormOption = this.route.snapshot.paramMap.get("value");
        // Get user info from api and bind into form value for edit user
        if (this.selcectFormOption == "edit") {
            this.apiService
                .commissionUnmapped(this.id)
                .subscribe((response) => {
                    if (response["status"] == "ok") {
                        console.log(response["data"], "dat");
                        this.branch_list = response["data"];
                        var property1 = [];
                        for (var i = 0; i < this.branch_list.length; i++) {
                            property1.push({
                                branch_code: this.branch_list[i].branch_code,
                                branch_name: this.branch_list[i].branch_name,
                            });
                        }
                        this.branches = property1;
                        this.dropdownSettings = {
                            singleSelection: false,
                            idField: "branch_code",
                            textField: "branch_name",
                            selectAllText: "Select All",
                            unSelectAllText: "UnSelect All",
                            itemsShowLimit: 5,
                            allowSearchFilter: true,
                        };
                    }
                });
            this.apiService.viewCommission(this.id).subscribe((response) => {
                if (response["status"] == "ok") {
                    this.selectedItems = [];
                    if (response["data"]["branch"] != []) {
                        this.selectedItems = response["data"]["branch"];
                    }
                    console.log(this.selectedItems, "selectedItems");

                    this.form = this._formBuilder.group({
                        commission_code: [
                            response["data"].group_code,
                            [
                                Validators.required,
                                UsernameValidator.cannotContainSpace,
                            ],
                        ],
                        commission_name: [
                            response["data"].name,
                            [
                                Validators.required,
                                UsernameValidator.cannotContainSpace,
                            ],
                        ],
                        commission_desc: [
                            response["data"].description,
                            [Validators.required],
                        ],
                        commission_percentage: [
                            response["data"].percentage,
                            [Validators.required],
                        ],
                        id: response["data"].id,
                        branch: [this.selectedItems],
                    });
                }
            });
            // this.apiService.commissionUnmapped(this.id).subscribe((response) => {
            //   if (response['status'] == 'ok') {
            //     this.branch_list=response['data'];
            //     var property1 = [];
            //       for (var i = 0; i < this.branch_list.length; i++) {
            //           property1.push({
            //               "branch_code": this.branch_list[i].branch_code,
            //               "branch_name": this.branch_list[i].branch_name
            //           })
            //       }
            //       this.branches = property1;
            //       this.dropdownSettings = {
            //         singleSelection: false,
            //         idField: 'branch_code',
            //         textField: 'branch_name',
            //         selectAllText: 'Select All',
            //         unSelectAllText: 'UnSelect All',
            //         itemsShowLimit: 3,
            //         allowSearchFilter: true,
            //     };

            //   }

            // })
        } else {
            this.apiService.commissionUnmapped("new").subscribe((response) => {
                if (response["status"] == "ok") {
                    this.branch_list = response["data"];
                    var property1 = [];
                    for (var i = 0; i < this.branch_list.length; i++) {
                        property1.push({
                            branch_code: this.branch_list[i].branch_code,
                            branch_name: this.branch_list[i].branch_name,
                        });
                    }
                    this.branches = property1;
                    this.dropdownSettings = {
                        singleSelection: false,
                        idField: "branch_code",
                        textField: "branch_name",
                        selectAllText: "Select All",
                        unSelectAllText: "UnSelect All",
                        itemsShowLimit: 3,
                        allowSearchFilter: true,
                    };
                }
            });
        }
        this.form = this._formBuilder.group({
            commission_code: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            commission_name: [
                "",
                [Validators.required, UsernameValidator.cannotContainSpace],
            ],
            commission_desc: ["", [Validators.required]],
            commission_percentage: ["", [Validators.required]],
            branch: [[this.selectedItems], [Validators.required]],
        });
    }
    onItemSelect(e) {
        this.selectedItems = [];
    }
    omit_special_char(event) {
        var k;
        k = event.charCode; //         k = event.keyCode;  (Both can be used)
        return (
            (k > 64 && k < 91) ||
            (k > 96 && k < 123) ||
            k == 8 ||
            k == 32 ||
            (k >= 48 && k <= 57)
        );
    }
    handleLimitSelection() {
        if (this.limitSelection) {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
                limitSelection: 2,
            });
        } else {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
                limitSelection: null,
            });
        }
    }
    get f() {
        return this.form.controls;
    }
    updateCommission() {
        let send_update_value = {
            group_code: this.form.value.commission_code.trim(),
            name: this.form.value.commission_name,
            description: this.form.value.commission_desc.trim(),
            percentage: this.form.value.commission_percentage.trim(),
            branch: this.form.value.branch,
        };
        if (this.form.valid) {
            this.apiService
                .editCommission(this.id, send_update_value)
                .subscribe((data) => {
                    if (data["status"] == "ok") {
                        this.snackBar.open(
                            "Commission Updated Successfully",
                            "Close",
                            {
                                duration: 2000,
                            }
                        );
                        this.router.navigateByUrl("/manage-commission");
                    } else {
                        this.snackBar.open(data["data"], "Close", {
                            duration: 3000,
                        });
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

    createCommission() {
        this.submitted = true;
        let send_commission = {
            group_code: this.form.value.commission_code.trim(),
            name: this.form.value.commission_name,
            description: this.form.value.commission_desc.trim(),
            percentage: this.form.value.commission_percentage.trim(),
            branch: this.form.value.branch,
        };
        if (this.form.valid) {
            this.apiService
                .createCommission(send_commission)
                .subscribe((res) => {
                    if (res["status"] == "ok") {
                        this.snackBar.open(
                            "Commission Added Successfully",
                            "Close",
                            {
                                duration: 3000,
                            }
                        );
                        this.router.navigateByUrl("/manage-commission");
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
