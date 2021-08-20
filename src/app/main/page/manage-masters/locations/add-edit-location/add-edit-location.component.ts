import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.scss']
})
export class AddEditLocationComponent implements OnInit {
  id: any;
  selcectFormOption: any;
  form: FormGroup;
  submit: boolean;
  playload: any = {};

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
  

    this.form = this.fb.group({
      locationid: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      locationname: ['', [Validators.required], SpacecValidator.cannotContainSpace]
    })
    if (this.selcectFormOption == "edit") {
      this.form = this.fb.group({
        locationid: [this.id, [Validators.required, SpacecValidator.cannotContainSpace]],
        locationname: ['test', [Validators.required], SpacecValidator.cannotContainSpace]
      })
    }
  }
  get f() { return this.form.controls }
  addLocation() {
    this.submit = true;
    this.playload = {}
  }
  updateLocation() {
    this.submit = true;
    this.playload = {}
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
