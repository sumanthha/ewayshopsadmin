import { Component, OnInit,Inject,Optional  } from '@angular/core';
import {MatDialog ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-dialog-delete-subject',
  templateUrl: './dialog-delete-subject.component.html',
  styleUrls: ['./dialog-delete-subject.component.scss'] 
})
export class DialogDeleteSubjectComponent implements OnInit {

	propertyDeletePayload : any;
	deleteData : any;

  constructor(private dialog : MatDialog,
  @Optional() private dialogRef: MatDialogRef<DialogDeleteSubjectComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) private data,
  public subjectService:SubjectService) { }

  ngOnInit() {  
    
    this.deleteData=this.data;
    this.deleteData.is_active = false;
    this.deleteData.is_deleted = true;  
  }

  delete(){
  	this.deleteProperty(this.deleteData.subject_id);
  }

  deleteProperty(id){
 
    this.deleteData.is_deleted = true
    this.subjectService.deleteSubject(this.deleteData,id).subscribe(
      (res) => {
        if(res['status']=="200"){
          setTimeout(()=>{    
              this.dialogRef.close({delete:'success'});
          })
  }else {
  }
      }
    )
  }



  close(){
  	this.dialog.closeAll();
  }

}
