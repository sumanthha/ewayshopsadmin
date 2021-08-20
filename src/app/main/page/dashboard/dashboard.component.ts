import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../services/apiservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileName: any;
  GetCustomer: any[];
  branch_Count: any;
  order_Count:any;

  constructor(private apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.profileName = localStorage.getItem('profileName');
    this.apiservice.listBranch().subscribe((response) => {
      this.GetCustomer = []
      if (response['status'] == 'OK') {
        if(response['data'].length >0){
        this.branch_Count=response['data'].length;
        }
        else{
          this.branch_Count=0
        }
      }
    })
    this.apiservice.orderList().subscribe((response) => {
      this.GetCustomer = []
      if (response['status'] == 'OK') {
        if(response['data'].length>0){
        this.order_Count=response['data'].length;
        }
        else{
          this.order_Count=0
        }
      }
    })
  }

}
