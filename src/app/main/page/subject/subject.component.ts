import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogDeleteSubjectComponent } from './delete-dialog-subject/dialog-delete-subject.component';
import * as SendBird from "sendbird";
import { AppSettings } from 'app/app.constant';


export interface SubjectElements {
  subject_id: number;
  subject_name: string;
  subject_description: string;
  is_active: boolean;
  is_deleted: boolean;
}
const SUBJECT_DATA: SubjectElements[] = [];
@Component({
  selector: 'subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})


export class SubjectComponent implements OnInit,AfterViewInit {
  
  subjectList: any=[
    {subject_id: 1, subject_name: 'Hydrogen', subject_description:"hello thois", is_active:true,is_deleted:false},
    {subject_id: 2, subject_name: 'Hydrogen2', subject_description:"hello this", is_active:false,is_deleted:true},
  ];
  p:number =1;
  displayedColumns = ['subject_id', 'subject_name','subject_description','action'];
  dataSource= new MatTableDataSource<SubjectElements>(SUBJECT_DATA);
  @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
  total_pages: any=1;
  @ViewChild('filter', {static: true})
    filter: ElementRef;
    q:any='';
  payload: {};
  total_count: number;
  page_number: any=1;
  Current_page: any=1;
  page_size: any=10;
  constructor(
    public subjectService : SubjectService,
    private router : Router,
    private dialog : MatDialog,
    private snackBar:MatSnackBar
  ) { }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.subjectList)
    setTimeout(() => this.dataSource.paginator = this.paginator);
 
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.initSubject()
  }
  fetchSubjects(payload){
 
    // this.subjectService.getSubjects(this.payload).subscribe(
    //   (response) => {
    //     this.subjectList = response['results']
    //     this.total_count = response['count']
        
     
    //   },
    // )
  }
  search(){
  
    this.payload ={
      page_size: this.page_size,
      page:1,
      q:this.q,
      order_by:'',
      sort:''
    }
    this.fetchSubjects(this.payload)
  }
  initSubject(){
    this.payload ={
      page_size: this.page_size,
      page:this.page_number,
      q:this.q,
      order_by:'',
      sort:''
    }
    this.fetchSubjects(this.payload)
  }
  addSubject(){
    this.router.navigate(['/pages/subject/add'])
  }
  editSubject(id){
    this.router.navigate([`/pages/subject/edit/${id}`])
  }
  sortData($event){
 
    
    let order_by = $event.active
    let sort = $event.direction
    this.payload = {
      page : 1,
      page_size : this.page_size,
      q:this.q,
      order_by:order_by,
      sort:sort
    }
    this.fetchSubjects(this.payload)
  }
  paginationFn(event){
   
    this.page_number = event
    this.page_size = this.page_size
    this.Current_page = event
    this.payload = {
      page : this.page_number,
      page_size : this.page_size,
      q:this.q,
      order_by:'',
      sort:''
    }
    this.fetchSubjects(this.payload)
  }
  deleteSubject(dataRow): void {
    const dialogRef = this.dialog.open(DialogDeleteSubjectComponent, {
      width: '250px',
      data: dataRow
    });
    dialogRef.afterClosed().subscribe(result => {
    
      if(result !=undefined){
        this.snackBar.open("Subject Deleted","Close",{
          duration: 4000,
        })
        setTimeout(()=>{
          this.initSubject();},1000)
      }
    
    });
  }

}
