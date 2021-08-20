import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiserviceService } from 'app/services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-size',
  templateUrl: './add-edit-size.component.html',
  styleUrls: ['./add-edit-size.component.scss']
})
export class AddEditSizeComponent implements OnInit {
  id: any;
  selcectFormOption: any = 'add';
  submit: boolean;
  form: FormGroup;
  playload = {};
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private apiService: ApiserviceService, private notification: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    this.form = this.formBuilder.group({
      size_id: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      name: ['', [Validators.required, SpacecValidator.cannotContainSpace]]
    })
    if (this.selcectFormOption == "edit") {
      this.apiService.viewSize(this.id).subscribe(res => {
        if (res['status'] == 'ok') {
          this.form = this.formBuilder.group({
            id: [this.id],
            size_id: [res['data'].size_id, [Validators.required, SpacecValidator.cannotContainSpace]],
            name: [res['data'].name, [Validators.required, SpacecValidator.cannotContainSpace]]
          })
        }
      })

    }

  }
  get f() { return this.form.controls }
  addSize() {
    this.submit = true;
    this.playload = this.form.value;
    if (this.form.valid) {
      this.apiService.addSize(this.playload).subscribe(res => {
        if (res['status'] == 'ok') {
          this.router.navigate(['/manage-masters/size']);
          this.notification.open(res['data'], 'close', {
            duration: 2000,
          });
        } else if (res['status'] == 'error') {
          this.notification.open(res['data'], 'close', {
            duration: 2000,
          });

        }
      })
    }
  }
  updateSize() {
    this.submit = true;
    this.playload = this.form.value;
    if (this.form.valid) {
      this.apiService.updateSize(this.playload).subscribe(res => {
        if (res['status'] == 'ok') {
          this.notification.open(res['data'], 'close', {
            duration: 2000,
          });
          this.router.navigate(['/manage-masters/size']);
        }
      })
    }
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