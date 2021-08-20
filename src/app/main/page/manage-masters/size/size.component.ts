import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { ApiserviceService } from 'app/services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface sizeData {
  sizeid: number;
  sizeNmae: string;

}
let sizeData: sizeData[] = [];


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  animations: fuseAnimations,
})
export class SizeComponent implements OnInit {
  sizeList: any = [];
  id: any;
  displayedColumns: string[] = ['sizeid', 'sizename', 'action'];
  @ViewChild('deletesizeDialog', { static: true }) deletesizeDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sizeTable: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private apiService: ApiserviceService, private notification: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.viewSize().subscribe(res => {
      if (res['status'] == 'ok') {
        this.sizeList = res['data'];
        sizeData = this.sizeList;
        this.sizeTable = new MatTableDataSource(this.sizeList);
        setTimeout(() => this.sizeTable.paginator = this.paginator);
        setTimeout(() => this.sizeTable.sort = this.sort);
      } else if (res['status'] == 'error') {
      
      }
    })


  }
  //show delete popup
  deletesize(id: any) {
    this.dialog.open(this.deletesizeDialog);
    this.id = id;
  }
  //confirm delete popup 
  confirmdeleteSize() {
    this.apiService.deleteSize(this.id).subscribe(res => {
      if (res['status'] == 'ok') {
        this.notification.open(res['data'], 'close', {
          duration: 2000,
        });
        this.ngOnInit();
      }
    })
  }
  searchUser(filterValue: string) {
    this.sizeTable.filter = filterValue.trim().toLowerCase();
    if (this.sizeTable.paginator) { this.sizeTable.paginator.firstPage(); }
  }
}
