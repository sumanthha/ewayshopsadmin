import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { ApiserviceService } from '../../../../services/apiservice.service';




export interface markData {
  markid: number;
  markname: string;
}
let markData: markData[] = [];

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
  animations: fuseAnimations,
})
export class MarkComponent implements OnInit {
  markList: any = [];
  id: any;
  displayedColumns: string[] = ['mark-id', 'mark-name', 'action'];
  @ViewChild('deleteMarkDialog', { static: true }) deleteMarkDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  markTable: MatTableDataSource<any>;

  //show delete popup
  deletermark(id: any) {
    this.dialog.open(this.deleteMarkDialog);
    this.id = id;
  }
  //confirm delete popup 
  confirmdeleteMark() {
    alert('deleted' + this.id);
  }
  constructor(private dialog: MatDialog, private apiService: ApiserviceService) { }

  ngOnInit(): void {

    this.apiService.viewMark().subscribe(
      async (res) => {
        if (res['status'] == 'ok') {
          // this.markList = [];
          this.markList = res['data'];
        

          markData = this.markList;
        
          this.markTable = new MatTableDataSource(this.markList);
          setTimeout(() => this.markTable.paginator = this.paginator);

          // this.initPaginator();
          // res['data'].forEach((item,) => {
          //   // let obj = {
          //   //   "id": item['id'],
          //   //   "name": item['name'],
          //   //   "mark_id": item['mark_id'],
          //   // }

          // });
        }
      });


    // markData = this.markList;
    // this.markTable = new MatTableDataSource(this.markList);
    // setTimeout(() => this.markTable.paginator = this.paginator);

  }
  searchUser(filterValue: string) {
    this.markTable.filter = filterValue.trim().toLowerCase();
    if (this.markTable.paginator) { this.markTable.paginator.firstPage(); }
  }

}
