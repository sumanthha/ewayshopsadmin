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
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.scss']
})


export class ViewPaymentsComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['id', 'customer_name', 'store_name', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  payment_code: any;
  test_mode: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //getCustomerDeatils
    this.apiService.viewPayment(this.id).subscribe((response) => {
      if (response['status'] == "ok") {
        this.payment_code = response['data'].payment_code;
        this.test_mode = response['data'].test_mode;
      }


    })
    // this.value = this.route.snapshot.paramMap.get('value');
  }

}
