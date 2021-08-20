import { Component, OnInit, ViewEncapsulation,ViewChild, ElementRef, AfterViewInit,NgZone } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { MapsAPILoader } from '@agm/core';
/* API SERVICE*/

import { ApiserviceService } from '../../../../services/apiservice.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.scss']
})

export class AddPaymentsComponent implements OnInit {
  @ViewChild('search',{ static: true }) searchAddElementRef: ElementRef;
  id: any;
  selcectFormOption: any;
  checkSpace: boolean;
  fieldName: any;
  updateEmail: any;
  geoCoder: any;
  latitude: number;
  longitude: number;
  zoom: number = 5;
  form: FormGroup;
  submitted = false;
  address: string;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader, private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {
   
    this.id = this.route.snapshot.paramMap.get('id');

    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    // Get user info from api and bind into form value for edit user


    if (this.selcectFormOption == 'edit') {
      this.apiService.viewCustomer(this.id).subscribe((response) => {
        if (response['status'] == "OK") {
          this.form = this._formBuilder.group({
            branch_code: [response['data'].branch_code, [Validators.required, UsernameValidator.cannotContainSpace]],
            branch_name: [response['data'].branch_name, [Validators.required, UsernameValidator.cannotContainSpace]],
            mobile: [response['data'].phone_number, [Validators.required, Validators.pattern('^[0-9\-\(\)\s]+')]],
            email: [response['data'].email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            address: [response['data'].address, [Validators.required, UsernameValidator.cannotContainSpace]],
            zipcode: [response['data'].zipcode, [Validators.required, UsernameValidator.cannotContainSpace]],
            id: response['data'].id,
          });
          this.form.controls['email'].disable();
          this.updateEmail = response['data'].email;
        }

      });
    }

    //alert(this.selcectFormOption);
    this.form = this._formBuilder.group({
      payment_code: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      Payment_mode: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
    
    });


  }
  get f() { return this.form.controls; }
  updateBranch() {
    let send_update_value = {
      "id": this.form.value.id,
      "shop_name": "",
      "address": this.form.value.address.trim(),
      "phone_number": this.form.value.mobile,
      "branch_code": this.form.value.branch_code.trim(),
      "branch_name": this.form.value.branch_name.trim(),
      "zipcode": this.form.value.zipcode.trim(),
      "product_category": "",
      "email": this.updateEmail,
      "is_buyer": true,
      "is_seller": false
    }
   
    if (this.form.valid) {
      this.apiService.editCustomer(this.id, send_update_value).subscribe((data) => {
        if (data['status'] == "OK") {
          this.snackBar.open("Customer Updated Successfully", 'Close', {
            duration: 2000
          });
          this.router.navigateByUrl('/manage-customers')
        } else {
          this.snackBar.open('Something wrong unable to update', 'Close', {
            duration: 3000
          });
        }



      });
    }
    this.submitted = true;
    // alert('submited');
    //this.form.valid ? alert('ok') : alert('no'); 
  }

  //type number only validation
  numberOnly(event) {

    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) || (event.target.value.length) >= 15) {
      if (charCode == 43) { return true; }
      else {
        event.preventDefault(); return false;
      }
    } else { return true; }
  }




  createPayment() {
    this.submitted = true;
    let send_customer = {
      "payment_code": this.form.value.payment_code.trim(),
      "test_mode": this.form.value.Payment_mode,
    }
    if (this.form.valid) {
      this.apiService.createPayment(send_customer).subscribe(res => {
      
        if (res['status'] == "ok") {
          this.snackBar.open("Payment Added Succesfully", 'Close', {
            duration: 3000
          });
          this.router.navigateByUrl('/manage-payments')
        } else {
          this.snackBar.open(res['message'], 'Close', {
            duration: 3000
          });
        }
      });
    }

  }

}
export class UsernameValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    var value = control.value.trim();
    if (value == 0) {
      return { cannotContainSpace: true }
    }
    return null;
  }
}
