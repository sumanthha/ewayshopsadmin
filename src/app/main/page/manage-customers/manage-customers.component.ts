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
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component'
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
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
  animations: fuseAnimations,
})
export class ManageCustomersComponent implements OnInit {
  CustomerList: any = [];
  displayedColumns: string[] = ['fname','lname', 'phone', 'email', 'dob', 'gender', 'location', 'action'];
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
    private snackBar: MatSnackBar, private apiservice: ApiserviceService) {
  }
  deleterCustomer(id: any, name: any) {
    
    let del = id;
    const confirmDialog = this.dialog.open(DeleteCustomerComponent, {
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
    //ListCustomer Api
    this.GetCustomer = [
      { id: 1, name: "riyass", phone: "9543030145", email: "mrail007@gmail.com", dob: '18/07/1997', gender: 'Male', location: 'Chennai', socialmedia: { facebook: "facebook" } },
      { id: 2, name: "riyass", phone: "9543030145", email: "mrail007@gmail.com", dob: '18/07/1997', gender: 'Male', location: 'trichy', socialmedia: { google: "google ID", apple: 'apple', facebook: 'facebook' } },

    ]
    CUSTOMER_DATA = this.GetCustomer
    this.CustTable = new MatTableDataSource(this.GetCustomer);
    setTimeout(() => this.CustTable.paginator = this.paginator);
    setTimeout(() => this.CustTable.sort = this.sort);

    //Commenting this api call for static data (enable this for real data)
    // this.apiservice.listCustomers().subscribe((response) => {

    //   this.GetCustomer = []
    //   if (response['status'] == 'OK') {
    //     response['data'].forEach((item, index) => {
    //       let obj = {
    //         "sno": index + 1,
    //         "id": item['id'],
    //         "name": item['first_name'] + ' ' + item['last_name'],
    //         "phone": item['phone_number'],
    //         "email": item['email'],
    //         "address": item['address'],
    //         "landmark": item['landmark'],
    //       }
    //       this.GetCustomer.push(obj)
    //     });
    //   }
    //   CUSTOMER_DATA = this.GetCustomer
    //   this.CustTable = new MatTableDataSource(this.GetCustomer);
    //   setTimeout(() => this.CustTable.paginator = this.paginator);
    //   setTimeout(() => this.CustTable.sort = this.sort);
    // })
  }
  searchUser(filterValue: string) {
    this.CustTable.filter = filterValue.trim().toLowerCase();
    if (this.CustTable.paginator) { this.CustTable.paginator.firstPage(); }
  }

}