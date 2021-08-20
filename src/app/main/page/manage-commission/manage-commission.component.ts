import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
/* SERVICE IMPORT */
import { ApiserviceService } from "../../../services/apiservice.service";
import { DeleteCommissionComponent } from "./delete-commission/delete-commission.component";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
export interface ManageCustomerData {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: number;
    address: string;
    landmark: string;
    email: string;
}
let CUSTOMER_DATA: ManageCustomerData[] = [];
@Component({
    selector: "app-manage-commission",
    templateUrl: "./manage-commission.component.html",
    styleUrls: ["./manage-commission.component.scss"],
    animations: fuseAnimations,
})
export class ManageBranchComponent implements OnInit {
    @ViewChild("searchadd", { static: false }) searchAddElementRef: ElementRef;

    lat = -1.2921;
    lng = 36.8219;
    CustomerList: any = [];
    displayedColumns: string[] = [
        "commissiongroupcode",
        "commissiongroupname",
        "commissiondesc",
        "commissionper",
        "action",
    ];
    dataSource = new MatTableDataSource<ManageCustomerData>(CUSTOMER_DATA);
    GetCommission: any;
    CustTable: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    name: any;
    lastname: any;
    phone: any;
    email: any;
    address: any;
    landmark: any;
    display: any = "none";
    Mappingshow: boolean = false;
    Branch_list: any = [];
    dropdownSettings_store = {};
    selectedStore_Data: any = [];
    selectedStore: any;
    branch_list: any;
    form: FormGroup;
    submitted = false;
    commission_array: any = [];
    mapcommision: any = "";
    commission_code: any;
    constructor(
        private router: Router,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private apiservice: ApiserviceService
    ) {}
    deleterCommission(id: any, name: any) {
        let del = id;
        const confirmDialog = this.dialog.open(DeleteCommissionComponent, {
            data: {
                title: "Confirm Remove Commission group",
                message: "Are you sure, you want to remove Commission: " + name,
            },
        });
        confirmDialog.afterClosed().subscribe((result) => {
            if (result === true) {
                this.apiservice.deleteCommission(del).subscribe((response) => {
                    debugger;
                    if (response["status"] == "ok") {
                        this.snackBar.open(response["data"], "Close", {
                            duration: 3000,
                        });
                    }
                    this.ngOnInit();
                });
            }
        });
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            commission_code: ["", [Validators.required]],
            mapping_groupname: ["", [Validators.required]],
        });

        //Commenting this api call for static data (enable this for real data)
        this.apiservice.listCommission().subscribe((response) => {
            this.GetCommission = [];
            if (response["status"] == "ok") {
                response["data"].forEach((item, index) => {
                    let obj = {
                        sno: index + 1,
                        id: item["id"],
                        commission_code: item["group_code"],
                        commission_name: item["name"],
                        commission_desc: item["description"],
                        percentage: item["percentage"],
                    };
                    this.GetCommission.push(obj);
                });
            }
            CUSTOMER_DATA = this.GetCommission;
            this.CustTable = new MatTableDataSource(this.GetCommission);
            setTimeout(() => (this.CustTable.paginator = this.paginator));
            setTimeout(() => (this.CustTable.sort = this.sort));
        });
    }
    searchUser(filterValue: string) {
        this.CustTable.filter = filterValue.trim().toLowerCase();
        if (this.CustTable.paginator) {
            this.CustTable.paginator.firstPage();
        }
    }

    commissionMapping() {
        this.submitted = true;
        this.commission_array = [];
        let commission_code = this.form.value.commission_code;
        for (let i = 0; i < this.form.value.mapping_groupname.length; i++) {
            this.commission_array.push(
                this.form.value.mapping_groupname[i].branch_code
            );
        }
        let send_commission = {
            branch: this.commission_array,
        };
        if (this.form.valid) {
            this.apiservice
                .commissionMapping(commission_code, send_commission)
                .subscribe((res) => {
                    if (res["status"] == "ok") {
                        this.snackBar.open(res["data"], "Close", {
                            duration: 3000,
                        });
                        this.Mappingshow = false;
                    } else {
                        this.snackBar.open(res["message"], "Close", {
                            duration: 3000,
                        });
                        this.Mappingshow = true;
                    }
                    this.ngOnInit();
                });
        }
    }
}
