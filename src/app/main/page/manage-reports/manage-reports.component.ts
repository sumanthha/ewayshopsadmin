import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { ApiserviceService } from "../../../services/apiservice.service";
// import * as SendBird from "sendbird";
// import { AppSettings } from 'app/app.constant';
// import { format } from 'date-fns'
// import { Console } from 'node:console';
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
export interface Vendorlist {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    landmark: string;
    phone: number;
    email: string;
    category: string;
    store_name: string;
}
const VendorData: Vendorlist[] = [];
export interface ordersInfo {
    id: number;
    customerName: string;
    storeName: string;
    date: any;
    status: any;
}
const ORDERS_DATA: ordersInfo[] = [];

@Component({
    selector: "app-manage-reports",
    templateUrl: "./manage-reports.component.html",
    styleUrls: ["./manage-reports.component.scss"],
    animations: fuseAnimations,
})
export class ManageReportsComponent implements OnInit {
    toDay = new Date();
    selectDate = new Date();
    CustomerList: any = [];
    totalCustomer: any;
    totalStore: any = [];
    totalOrder: any;
    showOrderTable: boolean = false;
    showStoreTable: boolean = false;
    showCustomerTable: boolean = true;
    showPopup: boolean = false;
    endDateValue: any;
    startDateValue: any;
    resultInfo: any;
    displayedColumns: string[] = [
        "Order_id",
        "Order_date",
        "shop_name",
        "order_price",
        "Payment_type",
        "seller_status"
    ];
    storeColumns: string[] = [
        "branch_code",
        "branch_name",
        "branch_email",
        "branch_address",
        "branch_phone",
        "branch_desc",
    ];
    orderColumns: string[] = [
        "order_id",
        "order_date",
        "customer_name",
        "amount",
        "delivery_no",
        "payment_type",
        "status",
    ];
    GetCustomer: any;
    getStore: any;
    getOrders: any;
    data: any;
    dlFilename: any = "data";
    dlFileFiletername: any = "all";
    InvoiceTable: MatTableDataSource<any>;
    storeTable: MatTableDataSource<any>;
    orderTable: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild("vendor") vendor: MatPaginator;
    @ViewChild("order") order: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    //REPORT STATUS COUNT
    orderdCount: any = [];
    deliverdCount: any = [];
    readyForDelivery: any = [];
    packingCount: any = [];
    totalCount: any = "0";
    countOrder: any = "0";
    countReady: any = "0";
    countPacking: any = "0";
    countDeliverd: any = "0";
    totalstore_count: any;
    totalprofit: string;
    totalrevenue: string;
    profit: any;
    Getinvoice: any = [];
    branch_list: any = [];
    branchname:any;
    Selected_branchname: any;
    selectedBranch:any;
    isEnableSevendays: boolean=false;
    isEnableDateRange: boolean=false;
    isEnableThreeMonth: boolean=false;
    isEnableLastMonth: boolean=false;
    isEnableDay: boolean=false;
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private apiservice: ApiserviceService,
        private datePipe: DatePipe
    ) {
        this.initialLoad();
    }

    /* SHOW TABLES UI START */
    showOrder(el: HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
        this.showOrderTable = !this.showOrderTable;
        this.showCustomerTable = false;
        this.showStoreTable = false;
        if (this.showStoreTable == false && this.showCustomerTable == false) {
            this.showOrderTable = true;
        }
    }
    showCustomer(el: HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
        this.showCustomerTable = !this.showCustomerTable;
        this.showStoreTable = false;
        this.showOrderTable = false;
        if (this.showStoreTable == false && this.showOrderTable == false) {
            this.showCustomerTable = true;
        }
    }
    showVendor(el: HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
        this.showStoreTable = !this.showStoreTable;
        this.showOrderTable = false;
        this.showCustomerTable = false;
        if (this.showCustomerTable == false && this.showOrderTable == false) {
            this.showStoreTable = true;
        }
    }
    /*  DATA FILTER POPUP*/
    showDatepopup() {
        this.showPopup = !this.showPopup;
    }
    /* SHOW TABLES UI END  */

    /*  FILTERS ORDERS DATA */
    checkOrderStatus(value: any) {
        if (value != "alldata") {
            var filterOrderData = this.getOrders.filter(function (el) {
                return el.status == value;
            });
            this.getOrders = filterOrderData;
            switch (value) {
                case "alldata":
                    this.dlFileFiletername = "all";

                    break;
                case "Ordered":
                    this.dlFileFiletername = "ordered";

                    break;
                case "Packing in process":
                    this.dlFileFiletername = "packing-in-process";

                    break;
                case "Ready for delivery":
                    this.dlFileFiletername = "ready-for-delivery";
                    this.dlFileFiletername.replace("-", "");
                    break;
                case "Delivered":
                    this.dlFileFiletername = "delivered";
                    break;
            }
        }
        this.apiservice.reportData(this.data).subscribe((response) => {
            if (response["status"] == "OK") {
                this.getOrders = [];
                response["order"].forEach((item) => {
                    let obj = {
                        id: item["order_id"],
                        order_date: item["order_date"],
                        orderd: item["order_time"],
                        shop: item["customer_phone_no"],
                        status: item["order_status"],
                        amount: item["amount"],
                        customer_name: item["customerlist"],
                        delivery_no: item["customer_phone_no"],
                    };
                    this.getOrders.push(obj);
                });
            }
        });
        this.orderTable = new MatTableDataSource(this.getOrders);
        setTimeout(() => (this.orderTable.paginator = this.order));
    }
    // CHECK COUNT OF STATUS
    selectBranchName(event:any)
    {
       
        this.Selected_branchname=event.value;
        if(this.isEnableDay)
        {
        this.initialLoad();
        }
        else if(this.isEnableSevendays)
        {
            this.sevenDays();
        }
        else if(this.isEnableLastMonth)
        {
            this.lastMonth();
        }
        else if(this.isEnableDateRange)
        {
            this.customReportbyDate();
        }
        else if(this.isEnableThreeMonth)
        {
            this.lastThreeMonth();
        }
    }
    initialLoad() {
        this.isEnableSevendays=false;
        this.isEnableLastMonth=false;
        this.isEnableThreeMonth=false;
        this.isEnableDateRange=false;
        this.isEnableDay=true;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        let todayDate = yyyy + "-" + mm + "-" + dd;
        // this.startDateValue = todayDate;
        // this.endDateValue = todayDate;
        this.resultInfo = "Today " + "(" + todayDate + ")";
        this.data = { days: 1 , "shop_name":this.Selected_branchname};
        this.dlFilename = todayDate;
        this.ngOnInit();
    }
    sevenDays() {
        this.isEnableSevendays=true;
        this.isEnableLastMonth=false;
        this.isEnableThreeMonth=false;
        this.isEnableDateRange=false;
        this.isEnableDay=false;
        this.orderdCount = [];
        let seventDay = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
        var todayDate = new Date();
        this.dlFilename =
            this.datePipe.transform(todayDate, "yyy-MM-dd") +
            "-" +
            this.datePipe.transform(seventDay, "yyy-MM-dd");
        this.data = {
            from_date: this.datePipe.transform(seventDay, "yyy-MM-dd"),
            to_date: this.datePipe.transform(todayDate, "yyy-MM-dd"),
            shop_name:this.Selected_branchname
        };
        this.resultInfo =
            "From " +
            this.datePipe.transform(seventDay, "yyy-MM-dd") +
            " to " +
            this.datePipe.transform(todayDate, "yyy-MM-dd");
        this.ngOnInit();
    }
    lastMonth() {
        this.isEnableSevendays=false;
        this.isEnableLastMonth=true;
        this.isEnableThreeMonth=false;
        this.isEnableDateRange=false;
        this.isEnableDay=false;
        this.orderdCount = [];
        var todayDate = new Date();
        var monthfirstDay = new Date(
            todayDate.getFullYear(),
            todayDate.getMonth(),
            1
        );
        monthfirstDay.setMonth(monthfirstDay.getMonth() - 1);
        var MonthlastDay = new Date(
            monthfirstDay.getFullYear(),
            monthfirstDay.getMonth() + 1,
            0
        );
        //Date Format
        var fistDate = this.datePipe.transform(monthfirstDay, "dd-MM-yyy");
        var lastDate = this.datePipe.transform(MonthlastDay, "dd-MM-yyy");
        this.dlFilename = fistDate + "-" + lastDate;
        this.data = {
            from_date: this.datePipe.transform(monthfirstDay, "yyy-MM-dd"),
            to_date: this.datePipe.transform(MonthlastDay, "yyy-MM-dd"),
            shop_name:this.Selected_branchname
        };
        this.resultInfo = "From " + fistDate + " to " + lastDate;
        this.ngOnInit();
    }
    lastThreeMonth() {
        this.isEnableSevendays=false;
        this.isEnableLastMonth=false;
        this.isEnableThreeMonth=true;
        this.isEnableDateRange=false;
        this.isEnableDay=false;
        this.orderdCount = [];
        this.data = { days: 90 };
        var todayDate = new Date();
        var monthfirstDay = new Date(
            todayDate.getFullYear(),
            todayDate.getMonth() - 3
        );
        var MonthlastDay = new Date(
            monthfirstDay.getFullYear(),
            monthfirstDay.getMonth() + 3,
            0
        );
        //Date Format
        var fistDate = this.datePipe.transform(monthfirstDay, "dd-MM-yyy");
        var lastDate = this.datePipe.transform(MonthlastDay, "dd-MM-yyy");
        this.dlFilename = fistDate + "-" + lastDate;
        this.data = {
            from_date: this.datePipe.transform(monthfirstDay, "yyy-MM-dd"),
            to_date: this.datePipe.transform(MonthlastDay, "yyy-MM-dd"),
            shop_name:this.Selected_branchname
        };
        this.resultInfo = "From " + fistDate + " to " + lastDate;
        this.ngOnInit();
    }
    /* SELECT DATE DATA  START */
    customReportbyDate() {
        this.isEnableSevendays=false;
        this.isEnableLastMonth=false;
        this.isEnableThreeMonth=false;
        this.isEnableDateRange=true;
        this.isEnableDay=false;
        if (this.startDateValue._d && this.endDateValue._d) {
            let s_date = this.datePipe.transform(
                this.startDateValue._d,
                "yyyy-MM-dd"
            );
            let e_date = this.datePipe.transform(
                this.endDateValue._d,
                "yyyy-MM-dd"
            );
            this.dlFilename = s_date + "-" + e_date;
            this.resultInfo = "form " + s_date + " to " + e_date;
            this.data = { from_date: s_date, to_date: e_date ,shop_name:this.Selected_branchname};
            this.dlFileFiletername.concat(this.dlFilename);
            if (s_date && e_date) {
                this.ngOnInit();
                this.showPopup = false;
            }
        }
    }

    /* SELECT DATE DATA END */

    /* GET ORDERS DATA END   */

    /* DATA FILTER API */

    ngOnInit(): void {
        this.apiservice.listBranch().subscribe((response) => {
            this.branch_list = []
            if (response['status'] == 'OK') {
              response['data'].forEach((item, index) => {
                let obj = {
                  "sno": index + 1,
                  "branch_code": item['branch_code'],
                  "branch_name": item['branch_name'],
                }
                this.branch_list.push(obj)
              });
            }
        })
        //reset value order status count
        this.orderdCount = [];
        this.packingCount = [];
        this.readyForDelivery = [];
        this.deliverdCount = [];

        this.apiservice.reportData(this.data).subscribe((response) => {
            this.GetCustomer = [];
            this.totalStore = [];
            if (response["status"] == "OK") {
                this.totalCustomer = response["invoice_report"].length;
                for (let i = 0; i < response["profit"].length; i++) {
                    // if(response['profit'][i]['branch']!=[]){

                    this.totalStore.push(response["profit"][i]);

                    //}
                }
                this.totalstore_count = this.totalStore.length;
                this.totalOrder = response["order"].length;
                this.Getinvoice=[];
                response["invoice_report"].forEach((item, index) => {
                    let obj = {
                        sno: index + 1,
                        order_id: item["order_id"],
                        shop_name: item["shop_name"],
                        payment_status: item["payment_status"],
                        order_price: item["order_price"],
                        order_date: item["order_date"],
                        payment_type: item["payment_type"],
                        seller_status:item["seller_status"]
                    };
                    this.Getinvoice.push(obj);
                });
                console.log(this.Getinvoice,"Getinvoice")
                CUSTOMER_DATA = this.Getinvoice;
                this.InvoiceTable = new MatTableDataSource(this.Getinvoice);
                setTimeout(
                    () => (this.InvoiceTable.paginator = this.paginator)
                );

                this.getStore = [];

                this.totalprofit = response["total_profit"];
                this.totalrevenue = response["total_revenue"];
                response["profit"].forEach((item, index) => {
                    // if(item['branch'].length>0){
                    let obj = {
                        sno: index + 1,
                        id: item["id"],
                        baranchname: item["baranchname"],
                        branchaddress: item["branchaddress"],
                        branchcode: item["branchcode"],
                        branchphone: item["branchemail"],
                        total_commission: item["total_commission"],
                        total_revenue: item["total_revenue"],
                    };
                    this.getStore.push(obj);
                    //}
                });
                CUSTOMER_DATA = this.getStore;
                this.storeTable = new MatTableDataSource(this.getStore);
                setTimeout(() => (this.storeTable.paginator = this.vendor));
                setTimeout(() => (this.storeTable.sort = this.sort));
                this.getOrders = [];

                response["order"].forEach((item, index) => {
                    let obj = {
                        id: item["order_id"],
                        order_date: item["order_date"],
                        orderd: item["order_time"],
                        shop: item["branchlist"][0]["branch_name"],
                        status: item["order_status"],
                        amount: item["amount"],
                        customer_name: item["customerlist"],
                        delivery_no: item["customer_phone_no"],
                        payment_type:item['payment_type']
                    };
                    this.getOrders.push(obj);
                    this.totalOrder = this.getOrders.length;
                });
                for (var i = 0; i < this.getOrders.length; i++) {
                    if (this.getOrders[i]["status"] == "Ordered") {
                        this.orderdCount.push(this.getOrders[i]["status"]);
                        this.countOrder = this.orderdCount.length;
                    } else if (
                        this.getOrders[i]["status"] == "Packing in process"
                    ) {
                        this.packingCount.push(this.getOrders[i]["status"]);
                        this.countPacking = this.packingCount.length;
                    } else if (
                        this.getOrders[i]["status"] == "Ready for delivery"
                    ) {
                        this.readyForDelivery.push(this.getOrders[i]["status"]);
                        this.countReady = this.readyForDelivery.length;
                    }
                    if (this.getOrders[i]["status"] == "Delivered") {
                        this.deliverdCount.push(this.getOrders[i]["status"]);
                        this.countDeliverd = this.deliverdCount.length;
                    }
                }

                CUSTOMER_DATA = this.getOrders;
                this.orderTable = new MatTableDataSource(this.getOrders);
                setTimeout(() => (this.orderTable.paginator = this.order));
                setTimeout(() => (this.orderTable.sort = this.sort));
            } else {
                this.totalCustomer = "0";
                this.totalStore = "0";
                this.totalOrder = "0";
                this.getOrders = [];
                this.GetCustomer = [];
                this.getStore = [];
                this.snackBar.open("Sorry!, No Data Found", "Close", {
                    duration: 4000,
                    verticalPosition: "bottom",
                });
                this.orderTable = new MatTableDataSource(this.getOrders);
                this.storeTable = new MatTableDataSource(this.getStore);
                this.InvoiceTable = new MatTableDataSource(this.CustomerList);
                setTimeout(() => (this.storeTable.paginator = this.vendor));
                setTimeout(() => (this.storeTable.sort = this.sort));
                setTimeout(
                    () => (this.InvoiceTable.paginator = this.paginator)
                );
                setTimeout(() => (this.orderTable.paginator = this.order));
                setTimeout(() => (this.storeTable.sort = this.sort));
            }
        });
    }
}
export enum ExportType {
    XLS = "xls",
    XLSX = "xlsx",
    CSV = "csv",
    TXT = "txt",
    JSON = "json",
    OTHER = "other",
}
