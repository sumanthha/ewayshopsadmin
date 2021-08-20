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
import { DeleteBranchManagerComponent } from './delete-branchmanager/delete-branchmanager.component'
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
  templateUrl: './manage-branchmanager.component.html',
  styleUrls: ['./manage-branchmanager.component.scss'],
  animations: fuseAnimations,
})
export class ManageBranchManagerComponent implements OnInit {
  CustomerList: any = [];
  displayedColumns: string[] = ['Code','name','Branch_name', 'mobile', 'email', 'location','action'];
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
  deleterBranchManager(id: any, name: any,active:any) {
   
    let del = id;
    debugger;
    if(active==false){
    // const confirmDialog = this.dialog.open(DeleteBranchManagerComponent, {
    //   data: {
    //     title: 'Confirm Remove Branch Manager',
    //     message: 'Are you sure, you want to remove Branch Manager: ' + name
    //   }
    // });
    // confirmDialog.afterClosed().subscribe(result => {
      // if (result === true) {
        this.apiservice.deleteBranchManager(del).subscribe((response) => {
          if (response['status'] == "OK") {
            this.snackBar.open(response['message'], 'Close', {
              duration: 3000
            });
          }
          this.ngOnInit();
        })
      //}
    // });
  }
  else{
    // const confirmDialog = this.dialog.open(DeleteBranchManagerComponent, {
    //   data: {
    //     title: 'Confirm Remove Branch Manager',
    //     message: 'Are you sure, you want to activate Branch Manager: ' + name
    //   }
    // });
    // confirmDialog.afterClosed().subscribe(result => {
      // if (result === true) {
        this.apiservice.deleteBranchManager(del).subscribe((response) => {
          if (response['status'] == "OK") {
            this.snackBar.open(response['message'], 'Close', {
              duration: 3000
            });
          }
          this.ngOnInit();
        })
     // }
    // });
  }
    
  }
  ngOnInit(): void {
   
    this.apiservice.listBranchManager().subscribe((response) => {
       this.GetCustomer = []
      if (response['status'] == 'OK') {
        response['data'].forEach((item, index) => {
          if(item['branch'].length>0){
          let obj = {
            "sno": index + 1,
            "Code": item['profile_code'],
           // "Code":'BM02',
            "Branch_name":item['branch'][0]['branch_name'],
            "name": item['first_name'],
            "phone": item['phone_number'],
            "email": item['email'],
            "address": item['address'],
            "landmark": item['landmark'],
            "is_active":item['is_active']
          }
          this.GetCustomer.push(obj)
        }
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
  resetPassword(email)  {
    let mail = email;
    let formData: FormData = new FormData();
    formData.append('email', mail);
    this.apiservice.Reset_link(formData).subscribe(
    (response) => {
            if (response['status'] == "ok") {
                this.snackBar.open("Reset Link sent to your e-mail", "Close", {
                    duration: 4000,
                    verticalPosition: 'top'
                });
               
            } else {
                this.snackBar.open("Sorry,not able to send reset link", "Close", {
                    duration: 4000,
                    verticalPosition: 'top'
                })
            }
        }, (error) => {
            this.snackBar.open("Sorry,not able to send reset link", "Close", {
                duration: 4000,
                verticalPosition: 'top'
            })
        }
    )
  }
}