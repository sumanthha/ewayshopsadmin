import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';

/* API SERVICE*/

import { ApiserviceService } from '../../../../services/apiservice.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  id: any;
  selcectFormOption: any;
  checkSpace: boolean;
  fieldName: any;
  updateEmail: any;

  form: FormGroup;
  submitted = false;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar, private route: ActivatedRoute, private apiService: ApiserviceService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    // Get user info from api and bind into form value for edit user


    if (this.selcectFormOption == 'edit') {
      this.apiService.viewCustomer(this.id).subscribe((response) => {
        if (response['status'] == "OK") {
          this.form = this._formBuilder.group({
            first_name: [response['data'].first_name, [Validators.required, UsernameValidator.cannotContainSpace]],
            last_name: [response['data'].last_name, [Validators.required, UsernameValidator.cannotContainSpace]],
            phone: [response['data'].phone_number, [Validators.required, Validators.pattern('^[0-9\-\(\)\s]+')]],
            email: [response['data'].email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            address: [response['data'].address, [Validators.required, UsernameValidator.cannotContainSpace]],
            landmark: [response['data'].landmark, [Validators.required, UsernameValidator.cannotContainSpace]],
            id: response['data'].id,
          });
          this.form.controls['email'].disable();
          this.updateEmail = response['data'].email;
        }

      });
    }

    //alert(this.selcectFormOption);
    this.form = this._formBuilder.group({
      first_name: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      last_name: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\-\(\)\s]+')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      landmark: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      //id: [""]
    });


  }
  get f() { return this.form.controls; }
  updateCustomer() {
    let send_update_value = {
      "id": this.form.value.id,
      "shop_name": "",
      "address": this.form.value.address.trim(),
      "phone_number": this.form.value.phone,
      "first_name": this.form.value.first_name.trim(),
      "last_name": this.form.value.last_name.trim(),
      "landmark": this.form.value.landmark.trim(),
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

  //type number only validation
  // emptyAllow(event, value) {

  //   this.fieldName = value;
  //   var mystring = event.target.value.replace("/^s+|s+$/g,");
  //   if (mystring == 0) {
  //     this.checkSpace = true;

  //   } else {
  //     this.checkSpace = false;
  //     // event.target.value = mystring.trim();
  //   }
  // }


  createCustomer() {
    this.submitted = true;
    let send_customer = {
      "shop_name": "",
      "address": this.form.value.address.trim(),
      "phone_number": this.form.value.phone,
      "first_name": this.form.value.first_name.trim(),
      "last_name": this.form.value.last_name.trim(),
      "landmark": this.form.value.landmark.trim(),
      "product_category": "",
      "email": this.form.value.email,
      "is_buyer": true,
      "is_seller": false
    }
    if (this.form.valid) {
      this.apiService.createUsers(send_customer).subscribe(res => {
 
        if (res['status'] == "ok") {
          this.snackBar.open("Customer Added Succesfully", 'Close', {
            duration: 3000
          });
          this.router.navigateByUrl('/manage-customers')
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
