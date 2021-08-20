import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs'; 
import { SubjectService } from '../subject.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddsubjectComponent implements OnInit {

  form: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private subjectService:SubjectService,
        private router: Router,
        private snackBar:MatSnackBar
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Reactive Form
        this.form = this._formBuilder.group({
            subject_name : ['', Validators.required],
            is_active  : [true, Validators.required],
            is_deleted  : [false, Validators.required],
            subject_description :['']
        });
        
    }
    createSubject(){
      this.subjectService.createSubject(this.form.value).subscribe(
        (response)=>{
          this.snackBar.open("Subject Created","Close",{
            duration: 4000,
            verticalPosition:'top'
          })
          this.router.navigate(['/pages/subject'])

        },(error)=>{
        
          if(error['status'] ==400){
            var errors = error['error'] 
            if(errors['subject_name'] !=undefined && errors['subject_name'] !=''){
              this.form.controls.subject_name.setErrors({
                "duplicate_name_error": errors['subject_name'][0]
              });
            }
          }
          
        }

      )
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    cancel(){
      this.router.navigate(['/pages/subject'])
    }

    validationMessages = {
      'subject_name': [
        { type: 'required', message: 'Subject Name is required' },
        { type: 'pattern', message: 'Invalid Subject name' },
        { type: 'duplicate_name_error',message:'Subject Name Already Exist'}
      ]
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
