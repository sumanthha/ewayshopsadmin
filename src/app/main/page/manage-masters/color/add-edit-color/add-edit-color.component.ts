import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiserviceService } from '../../../../../services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-color',
  templateUrl: './add-edit-color.component.html',
  styleUrls: ['./add-edit-color.component.scss']
})
export class AddEditColorComponent implements OnInit {
  id: any;
  selcectFormOption: any;
  form: FormGroup;
  submit: boolean;
  playload: any = {};
  disabled: boolean = false;
  colorPicValue: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiserviceService, private notification: MatSnackBar, private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    this.form = this.fb.group({
      color_id: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      name: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      color_code: ['', [Validators.required, SpacecValidator.cannotContainSpace]]
    });
    if (this.selcectFormOption == "edit") {
      this.apiService.viewColor(this.id).subscribe(res => {
        if (res['status'] == 'ok') {
          this.colorPicValue = res['data'].color_code;
          this.form = this.fb.group({
            id: [this.id],
            color_id: [res['data'].color_id, [Validators.required, SpacecValidator.cannotContainSpace]],
            name: [res['data'].name, [Validators.required, SpacecValidator.cannotContainSpace]],
            color_code: [res['data'].color_code, [Validators.required, SpacecValidator.cannotContainSpace]]
          })
        }
      })
    }
  }
  get f() { return this.form.controls }
  addColor() {
    this.submit = true;
    this.playload = this.form.value;
    if (this.form.valid) {
      this.apiService.addColor(this.playload).subscribe(res => {
        if (res['status'] == "ok") {
          this.notification.open(res['message'], "Close", {
            duration: 2000,
          });
          this.router.navigate(['/manage-masters/color']);
        } else if (res['status'] == "error") {
          this.notification.open(res['message'], "bootom", {
            duration: 2000,
          });
        }
      })
    }

  }
  updateColor() {
    this.submit = true;
    this.playload = this.form.value
    if (this.form.valid) {

      this.apiService.editColor(this.playload).subscribe(res => {
        if (res['status'] == "ok") {
          this.notification.open(res['message'], "Close", {
            duration: 2000,
          });
          this.router.navigate(['/manage-masters/color']);
        } else if (res['status'] == "error") {
          this.notification.open("Something wrong unable to update color", "bootom", {
            duration: 2000,
          });
        }
      })

    }

  }
  //change color value 
  colorCheck() {
    this.colorPicValue = this.form.value.color_code
  }

}
//Prevent empty space in form 
export class SpacecValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    var value = control.value.trim();
    if (value == 0) {
      return { cannotContainSpace: true }
    }
    return null;
  }
}
