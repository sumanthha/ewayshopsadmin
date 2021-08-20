import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router'

import { ApiserviceService } from '../../../../services/apiservice.service';


export interface CustomerData {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;
  landmark: string;
  email: string;
}


export interface PeriodicElement {
  id: any;
  customer_name: string;
  store_name: string;
  date: any;
  status: any;
};
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, customer_name: 'Hydrogen', store_name: "Abc Store", date: '17/02/2021', status: "deliverd" },
  { id: 21, customer_name: 'Riyas', store_name: "XYZ Store", date: '14/02/2021', status: "waiting" },
  { id: 31, customer_name: 'Ahamed', store_name: "GHI Store", date: '11/02/2021', status: "canceled" },
];

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.scss']
})


export class ViewBranchComponent implements OnInit {

  
  id: any;
  displayedColumns: string[] = ['id', 'customer_name', 'store_name', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  branch_code: any;
  branch_name: any;
  branch_phone: any;
  branch_email: any;
  branch_address: any;
  zipcode: any;
  branch_description: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //getCustomerDeatils
    this.apiService.viewBranch(this.id).subscribe((response) => {
      // this.CUSTOMER_DATA = response;
   
      if (response['status'] == "OK") {
        this.branch_code = response['data'].branch_code;
        this.branch_name = response['data'].branch_name;
        this.branch_phone = response['data'].branch_phone;
        this.branch_email = response['data'].branch_email;
        this.branch_address = response['data'].branch_address;
        this.zipcode = response['data'].zipcode;
        this.branch_description = response['data'].branch_description;
      }


    })
    // this.value = this.route.snapshot.paramMap.get('value');
  }

}
