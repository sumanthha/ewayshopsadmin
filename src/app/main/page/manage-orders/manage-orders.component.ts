import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import Swal from "sweetalert2";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ApiserviceService } from "../../../services/apiservice.service";
import { MatSort } from "@angular/material/sort";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export interface ordersInfo {
    id: number;
    customerName: string;
    storeName: string;
    date: any;
    status: any;
}
let ORDERS_DATA: ordersInfo[] = [];

@Component({
    selector: "app-manage-orders",
    templateUrl: "./manage-orders.component.html",
    styleUrls: ["./manage-orders.component.scss"],
    animations: fuseAnimations,
})
export class ManageOrdersComponent implements OnInit {
    ordersList: any = [];
    display: any = "none";
    display1: any = "none";
    updateform: FormGroup;
    submit: boolean;
    displayedColumns = [
        "id",
        "order_date",
        "customer",
        "Shop_name",
        "amount",
        "Seller_payment_status",
       
        "feedback",
        "status",
        "action",
    ];
    dataSource = new MatTableDataSource<ordersInfo>(ORDERS_DATA);
    orderTable: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild("orderStauts", { static: true }) orderStauts: TemplateRef<any>;
    @ViewChild("orderStautsUpdate", { static: true })
    orderStautsUpdate: TemplateRef<any>;
    order_id: any;
    customer: any;
    seller_payment_status: string;
    showpayment_sts: boolean = true;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private apiService: ApiserviceService,
        private fb: FormBuilder
    ) {}

    @ViewChild(MatSort) sort: MatSort;
    ngOnInit(): void {
        this.updateform = this.fb.group({
            updateStausOption: ["", [Validators.required]],
        });
        this.orderTable = new MatTableDataSource(this.ordersList);
        ORDERS_DATA = this.ordersList;
        this.orderTable.paginator = this.paginator;
        setTimeout(() => (this.orderTable.paginator = this.paginator));

        this.apiService.orderList().subscribe((res) => {
            this.ordersList = [];
            if (res["status"] == "OK") {
                res["data"].forEach((order, index) => {
                    if (order["orderlist"].length > 0) {
                        let obj = {
                            sno: index + 1,
                            order_no: order["order_id"],
                            order_date: order["order_date"],
                            customer: order["customerlist"][0]["first_name"],
                            shop_no: order["shop_name"],
                            amount: order["amount"],
                            status: order["order_status"],
                            seller_status: order["seller_status"],
                            feedback: order["report_feedback"],
                        };
                        this.ordersList.push(obj);
                        console.log(this.ordersList, "orderlist");
                    }
                });

                ORDERS_DATA = this.ordersList;
                this.orderTable = new MatTableDataSource(this.ordersList);
                setTimeout(() => (this.orderTable.paginator = this.paginator));
            }
        });

        setTimeout(() => (this.dataSource.paginator = this.paginator));
    }
    get f() {
        return this.updateform.controls;
    }
    updateStatusSubmit() {
        this.submit = true;
    }
    modalOpen(order_id: any, customer: any) {
        this.order_id = order_id;
        this.customer = customer;
        this.display = "block";
    }
    modalOpen_payment(order_no: any) {
        this.display1 = "block";
        this.order_id = order_no;
    }
    radioChange(event: any) {
        let radio_resp = event.target.value;
        this.seller_payment_status = radio_resp;
    }
    payment_update() {
        if (this.seller_payment_status == undefined) {
            this.showpayment_sts = false;
            return false;
        } else {
            this.showpayment_sts = true;
        }
        let seller_payment_req = {
            order_id: this.order_id,
            seller_status: this.seller_payment_status,
        };
        this.apiService
            .Update_seller_Paymentstatus(seller_payment_req)
            .subscribe((response) => {
                if (response["status"] == "ok") {
                    Swal.fire(
                        "Success",
                        " Payment Status Updated Successfully",
                        "success"
                    );
                    this.display1 = "none";
                    this.ngOnInit();
                    this.seller_payment_status = "";
                } else {
                    Swal.fire("Failure", response["data"], "error");
                }
            });
    }
    modalClose() {
        this.display = "none";
        this.display1 = "none";
    }
    //Track Order Status
    trackStaus() {
        this.dialog.open(this.orderStauts, {
            panelClass: "trackpopup",
        });
    }
    updateStaus() {
        this.dialog.open(this.orderStautsUpdate, {
            panelClass: "update_popup",
        });
    }

    searchOrder(filterValue: string) {
        this.orderTable.filter = filterValue.trim().toLowerCase();
        if (this.orderTable.paginator) {
            this.orderTable.paginator.firstPage();
        }
    }
    async order_status(order_id: any, status: any) {
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Are you sure want to rejected ?",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here",
            },
            showCancelButton: true,
        });

        if (!text) {
            Swal.fire("failure", " Please enter notes", "error");
            return;
        } else {
            let status_req = {
                order_status: status,
                reason: text,
                order_id: order_id,
            };

            this.apiService
                .Update_OrderStatus(status_req)
                .subscribe((response) => {
                    if (response["status"] == "ok") {
                        Swal.fire(
                            "Success",
                            " Order Status Updated Successfully",
                            "success"
                        );
                        this.display = "none";
                        this.ngOnInit();
                    } else {
                        Swal.fire("Failure", response["data"], "error");
                    }
                });
        }
    }
}
