import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiserviceService } from "../../../../services/apiservice.service";
@Component({
    selector: "app-view-orders",
    templateUrl: "./view-orders.component.html",
    styleUrls: ["./view-orders.component.scss"],
})
export class ViewOrdersComponent implements OnInit {
    id: any;
    buyer_name: string;
    delivery_date: any;
    delivery_option: any;
    delivery_time: any;
    document: any;
    order_id: any;
    order_status: any;
    order_time: any;
    order_date: any;
    seller_shop_name: any;
    order_by: any;
    sold_by: any;
    customerInfo: any = {};
    vendorInfo: any = {};

    openClass: boolean = false;
    delivery_no: any;
    amount: any;
    itemlist: any = [];
    customerlist: any;
    payment_status: any;
    payment_type: any;
    constructor(
        private route: ActivatedRoute,
        private apiService: ApiserviceService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get("id");
        let data = {
            order_id: this.id,
        };
        this.apiService.orderDetails(data).subscribe((res) => {
            this.order_id = res["data"].order_id;
            this.order_date = res["data"].order_date;
            this.delivery_no = res["data"].customer_phone_no;
            this.amount = res["data"].amount;
            this.order_status = res["data"].order_status;
            this.itemlist = res["data"].orderlist;
            this.customerlist = res["data"].customerlist;
            this.payment_status = res["data"].payment_status;
            this.payment_type=res['data'].payment_type;
        });
    }
    imgOpen() {
        if (this.openClass == false) {
            this.openClass = true;
        } else {
            this.openClass = false;
        }
    }
}
