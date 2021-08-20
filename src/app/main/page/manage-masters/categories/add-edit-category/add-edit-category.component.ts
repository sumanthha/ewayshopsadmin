import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { ApiserviceService } from "../../../../../services/apiservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
@Component({
    selector: "app-add-edit-category",
    templateUrl: "./add-edit-category.component.html",
    styleUrls: ["./add-edit-category.component.scss"],
})
export class AddEditCategoryComponent implements OnInit {
    id: any;
    selcectFormOption: any;
    form: FormGroup;
    submit: boolean;
    playload: any = {};
    showcategory_code: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private apiService: ApiserviceService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get("id");
        this.selcectFormOption = this.route.snapshot.paramMap.get("value");
        this.form = this._formBuilder.group({
            category_Code: [
                "",
                [Validators.required, SpacecValidator.cannotContainSpace],
            ],
            category_Name: [
                "",
                [Validators.required, SpacecValidator.cannotContainSpace],
            ],
        });

        if (this.selcectFormOption == "edit") {
            this.showcategory_code = false;
            this.apiService.viewCategory(this.id).subscribe((response) => {
                if (response["status"] == "OK") {
                    this.form = this._formBuilder.group({
                        category_Code: [
                            this.id.trim(),
                            [
                                Validators.required,
                                SpacecValidator.cannotContainSpace,
                            ],
                        ],
                        category_Name: [
                            response["data"].category_name.trim(),
                            [
                                Validators.required,
                                SpacecValidator.cannotContainSpace,
                            ],
                        ],
                    });
                }
            });
        }
    }
    get f() {
        return this.form.controls;
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
    addCategory() {
        this.submit = true;
        this.playload = {
            category_code: this.form.value.category_Code,
            category_name: this.form.value.category_Name,
        };
        if (this.form.valid) {
            this.apiService.createCategory(this.playload).subscribe((res) => {
                if (res["status"] == "ok") {
                    this.snackBar.open("Category Added successfully", "Close", {
                        duration: 3000,
                    });
                    this.router.navigateByUrl("/manage-masters/categories");
                } else {
                    this.snackBar.open(res["data"], "Close", {
                        duration: 3000,
                    });
                }
            });
        }
    }
    updateCategory() {
        this.submit = true;
        this.playload = {
            category_code: this.form.value.category_Code,
            category_name: this.form.value.category_Name,
        };
        if (this.form.valid) {
            this.apiService
                .editCategory(this.id, this.playload)
                .subscribe((data) => {
                    if (data["status"] == "ok") {
                        this.snackBar.open(
                            "Category Updated successfully",
                            "Close",
                            {
                                duration: 2000,
                            }
                        );
                        this.router.navigateByUrl("/manage-masters/categories");
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
    }
}

//Prevent empty space in form
export class SpacecValidator {
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
