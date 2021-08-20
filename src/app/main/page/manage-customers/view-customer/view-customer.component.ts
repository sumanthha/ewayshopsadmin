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
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})


export class ViewCustomerComponent implements OnInit {

  firstName: string;
  lastName: string;
  mobile: any;
  email: string;
  address: string;
  landmark: string;
  id: any;

  // value:any;

  displayedColumns: string[] = ['id', 'customer_name', 'store_name', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //getCustomerDeatils
    this.apiService.viewCustomer(this.id).subscribe((response) => {
      // this.CUSTOMER_DATA = response;

      if (response['status'] == "OK") {
        this.firstName = response['data'].first_name;
        this.lastName = response['data'].last_name;
        this.mobile = response['data'].phone_number;
        this.email = response['data'].email;
        this.address = response['data'].address;
        this.landmark = response['data'].landmark;
      }


    })
    // this.value = this.route.snapshot.paramMap.get('value');
  }

}
