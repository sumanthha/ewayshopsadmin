import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/* SERVICE IMPORT */
import { ApiserviceService } from '../../../services/apiservice.service';
import { DeletePaymentsComponent } from './delete-payments/delete-payments.component'
export interface ManageCustomerData {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;  E
  landmark: string;
  email: string;
}
let CUSTOMER_DATA: ManageCustomerData[] = [];
@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.scss'],
  animations: fuseAnimations,
})
export class ManagePaymentsComponent implements OnInit {
  @ViewChild('searchadd', { static: false }) searchAddElementRef: ElementRef;
  
  lat = -1.2921;
  lng = 36.8219;
  CustomerList: any = [];
  displayedColumns: string[] = ['paymentcode','testmode','action'];
  dataSource = new MatTableDataSource<ManageCustomerData>(CUSTOMER_DATA);
  GetCustomer: any;
  CustTable: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  name: any;
  lastname: any;
  phone: any;
  email: any;
  address: any;
  landmark: any;
 
  constructor(private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,private apiservice: ApiserviceService) {
  }
  deleterCustomer(id: any, name: any) {
  
    let del = id;
    const confirmDialog = this.dialog.open(DeletePaymentsComponent, {
      data: {
        title: 'Confirm Remove Customer',
        message: 'Are you sure, you want to remove customer: ' + name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiservice.deleteCustomer(del).subscribe((response) => {
          if (response['status'] == "OK") {
            this.snackBar.open('Customer Deleted Successfully', 'Close', {
              duration: 3000
            });
          }
          this.ngOnInit();
        })
      }
    });
  }
  ngOnInit(): void {
    //Commenting this api call for static data (enable this for real data)
    this.apiservice.listPayment().subscribe((response) => {

      this.GetCustomer = []
      if (response['status'] == 'ok') {
        response['data'].forEach((item, index) => {
          let obj = {
            "sno": index + 1,
            // "id": item['id'],
            "payment_code": item['payment_code'],
            "test_mode": item['test_mode'],
          
          }
          this.GetCustomer.push(obj)
        });
      }
      CUSTOMER_DATA = this.GetCustomer
      this.CustTable = new MatTableDataSource(this.GetCustomer);
      setTimeout(() => this.CustTable.paginator = this.paginator);
      setTimeout(() => this.CustTable.sort = this.sort);
    })
  }
  searchUser(filterValue: string) {
    this.CustTable.filter = filterValue.trim().toLowerCase();
    if (this.CustTable.paginator) { this.CustTable.paginator.firstPage(); }
  }

}