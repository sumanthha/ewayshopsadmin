import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { ApiserviceService } from '../../../../services/apiservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface colorData {
  markid: number;
  markname: string;
}
let colorData: colorData[] = [];
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: fuseAnimations
})
export class ColorComponent implements OnInit {
  colorList: any = [];
  id: any;
  displayedColumns: string[] = ['color-id', 'color-name', 'color', 'action'];
  @ViewChild('deleteColorDialog', { static: true }) deleteColorDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  colorTable: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, private apiService: ApiserviceService, private notification: MatSnackBar) { }

  ngOnInit(): void {

    this.apiService.viewColor().subscribe(res => {
      if (res['status'] == 'ok') {
        this.colorList = res['data'];
        colorData = this.colorList;
        this.colorTable = new MatTableDataSource(this.colorList);
        setTimeout(() => this.colorTable.paginator = this.paginator);
        setTimeout(() => this.colorTable.sort = this.sort);
      }

    })

  }
  deletecolor(id: any) {
    this.id = id;
    this.dialog.open(this.deleteColorDialog);
  }
  confirmdeleteColor() {
    this.apiService.deleteColor(this.id).subscribe(res => {
      if (res['status'] == 'ok') {
        this.ngOnInit();
        this.notification.open(res['message'], 'close', {
          duration: 2000,
        });
      }

    })
  }
  searchUser(filterValue: string) {
    this.colorTable.filter = filterValue.trim().toLowerCase();
    if (this.colorTable.paginator) { this.colorTable.paginator.firstPage(); }
  }

}
