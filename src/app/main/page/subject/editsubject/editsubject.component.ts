import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectService } from '../subject.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-editsubject',
  templateUrl: './editsubject.component.html',
  styleUrls: ['./editsubject.component.scss']
})
export class EditsubjectComponent implements OnInit {

  form: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
  subject_id: any;
  subjectData: Object;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private subjectService:SubjectService,
        private router: Router,
        private route:ActivatedRoute,
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
        this.form = this._formBuilder.group({
            subject_name : ['', Validators.required],
            is_active  : ['', Validators.required],
            is_deleted : ['',Validators.required],
            subject_description : [''],
        });
        this.subject_id = this.route.snapshot.params['id'];
        this.subjectService.viewSubject(this.subject_id).subscribe(
          (response) =>{
            this.subjectData = response
            this.form.controls['subject_name'].setValue(this.subjectData['subject_name']);
            this.form.controls['is_active'].setValue(true);
            this.form.controls['is_deleted'].setValue(false);
            this.form.controls['subject_description'].setValue(this.subjectData['subject_description']);
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
        // Reactive Form
        
        
        // Horizontal Stepper form steps
        
    }
    updateSubject(){
      this.subjectService.updateSubject(this.form.value,this.subject_id).subscribe(
        (response)=>{
          this.snackBar.open("Subject Updated","Close",{
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
    cancelEdit(){
      this.router.navigate(['/pages/subject'])
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
    validationMessages = {
      'subject_name': [
        { type: 'required', message: 'Subject Name is required' },
        { type: 'pattern', message: 'Invalid Subject name' },
        { type: 'duplicate_name_error',message:'Subject Name Already Exist'}
        
      ]      
    }

}
