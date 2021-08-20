import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiserviceService } from '../../../../../services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-edit-mark',
  templateUrl: './add-edit-mark.component.html',
  styleUrls: ['./add-edit-mark.component.scss']
})
export class AddEditMarkComponent implements OnInit {
  id: any;
  selcectFormOption: any;
  form: FormGroup;
  submit: boolean;
  playload: any = {};
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiserviceService, private router: Router, private notification: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    this.form = this.fb.group({
      mark_id: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      name: ['', [Validators.required, SpacecValidator.cannotContainSpace]]
    })
    if (this.selcectFormOption == "edit") {
      this.apiService.viewMark(this.id).subscribe(res => {
        if (res['status'] == 'ok') {
          this.form = this.fb.group({
            id: this.id,
            mark_id: [res['data'].mark_id, [Validators.required, SpacecValidator.cannotContainSpace]],
            name: [res['data'].name, [Validators.required, SpacecValidator.cannotContainSpace]]
          })
        }
      })


    }

  }
  get f() { return this.form.controls }
  addMark() {
    this.submit = true;
    this.playload = this.form.value;
    if (this.form.valid) {
      this.apiService.addMark(this.playload).subscribe(res => {
        if (res['status'] == "ok") {
          this.notification.open(res['data'], 'Close', { duration: 2000, });
          this.router.navigate(['/manage-masters/mark'])
        } else {
          this.notification.open(res['data'], 'Close', { duration: 2000, });
        }
      })
    }

  }
  updateMark() {
    this.submit = true;
    this.playload = this.form.value;
    if (this.form.value) {
      this.apiService.updateMark(this.playload).subscribe(res => {
        if (res['status'] == 'ok') {
          this.notification.open(res['data'], 'Close', { duration: 2000 });
          this.router.navigate(['manage-masters/mark']);
        } else {
          this.notification.open(res['data'], "Close", { duration: 2000 })
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