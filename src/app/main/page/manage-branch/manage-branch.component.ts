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
import { DeleteBranchComponent } from './delete-branch/delete-branch.component'
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
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss'],
  animations: fuseAnimations,
})
export class ManageBranchComponent implements OnInit {
  @ViewChild('searchadd', { static: false }) searchAddElementRef: ElementRef;
  
  lat = -1.2921;
  lng = 36.8219;
  CustomerList: any = [];
  displayedColumns: string[] = ['branch_code','branch_name', 'branch_email', 'branch_phone','location','zipcode','action'];
  dataSource = new MatTableDataSource<ManageCustomerData>(CUSTOMER_DATA);
  GetCustomer: any;
  CustTable: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort , { static: true }) sort: MatSort;
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
  deleterBranch(id: any, name: any) {
    let del = id;
    const confirmDialog = this.dialog.open(DeleteBranchComponent, {
      data: {
        title: 'Confirm Remove Customer',
        message: 'Are you sure, you want to remove Branch: ' + name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiservice.deleteBranch(del).subscribe((response) => {
          if (response['status'] == "OK") {
            this.snackBar.open(response['message'], 'Close', {
              duration: 3000
            });
          }
          this.ngOnInit();
        })
      }
    });
  }
  ngOnInit(): void {
    ///Commenting this api call for static data (enable this for real data)
    this.apiservice.listBranch().subscribe((response) => {
      this.GetCustomer = []
      if (response['status'] == 'OK') {
        response['data'].forEach((item, index) => {
          let obj = {
            "sno": index + 1,
            "branch_code": item['branch_code'],
            "branch_name": item['branch_name'],
            "branch_description":item['branch_description'],
            "branch_phone": item['branch_phone'],
            "branch_email": item['branch_email'],
            "branch_address": item['branch_address'],
            "zipcode": item['zipcode'],
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