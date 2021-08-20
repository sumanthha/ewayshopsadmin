import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ApiserviceService } from '../../../../../services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  selcectFormOption: any;
  id: any;
  form: FormGroup
  submit: boolean;
  playload: any = {};
  mainCategory: any = [];
  selectedCategory: any;
  showSubcategory_code:boolean=true
  constructor(private route: ActivatedRoute,private snackBar:MatSnackBar,private router: Router, private fb: FormBuilder,private apiService:ApiserviceService) { }

  ngOnInit(): void {


    this.apiService.listCategory().subscribe((response) => {
      if (response['status'] == 'OK') {
        response['data'].forEach((item, index) => {
          let obj = {
            "category_code": item['category_code'],
            "category_name": item['category_name'],
          }
          this.mainCategory.push(obj)
        });
      }
    })
    //Loading main category
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.selcectFormOption = this.route.snapshot.paramMap.get('value');
    this.form = this.fb.group({
      category_code: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      category_name: ['', [Validators.required, SpacecValidator.cannotContainSpace]],
      category: ['', [Validators.required]]
    });
    //Load data form edit form   
    if (this.selcectFormOption == "edit") {
      this.showSubcategory_code=false;
        this.apiService.viewSubcategory(this.id).subscribe((response) => {
        if (response['status'] == "OK") {
      
      this.form = this.fb.group({
        category_code: [response['data'].category_code, [Validators.required, SpacecValidator.cannotContainSpace]],
        category_name: [response['data'].category_name, [Validators.required, SpacecValidator.cannotContainSpace]],
        category: [this.selectedCategory = response['data']['parent'].category_code, [Validators.required]]
      })
    }
  })
    }

  }
  //get form value for validation
  get f() { return this.form.controls; }
  addSubCategory() {
    this.submit = true;
    this.playload = { 'parent_name':this.form.value.category,'category_code': this.form.value.category_code, 'category_name': this.form.value.category_name }
    if (this.form.valid) {
      this.apiService.createSubcategory(this.playload).subscribe(res => {
     
      
        if (res['status'] == "ok") {
          this.snackBar.open("Sub Category Added successfully", 'Close', {
            duration: 3000
          });
          this.router.navigateByUrl('/manage-masters/sub-categories')
        } else {
          this.snackBar.open(res['data'], 'Close', {
            duration: 3000
          });
        }
      });
    }
   
  }
  updateSubCategory() {
    this.submit = true;
    this.playload = { 'parent_name':this.form.value.category,'category_code': this.form.value.category_code, 'category_name': this.form.value.category_name }
    if (this.form.valid) {
      this.apiService.editSubcategory(this.id, this.playload).subscribe((data) => {
        if (data['status'] == "ok") {
          this.snackBar.open(data['data'], 'Close', {
            duration: 2000
          });
          this.router.navigateByUrl('/manage-masters/sub-categories')
        } else {
          this.snackBar.open(data['data'], 'Close', {
            duration: 3000
          });
        }



      });
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
