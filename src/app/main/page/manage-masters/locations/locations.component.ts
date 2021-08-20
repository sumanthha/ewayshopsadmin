import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";


export interface locationData {
  markid: number;
  markname: string;
}
let locationData: locationData[] = [];

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  animations: fuseAnimations,
})
export class LocationsComponent implements OnInit {
  locationList: any = [];
  id: any;
  displayedColumns: string[] = ['locationid', 'locationname', 'action'];
  @ViewChild('deleteLocationDialog', { static: true }) deleteLocationDialog: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  locationTable: MatTableDataSource<any>;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.locationList = [
      { locationid: 1, locationname: "Black", },
      { locationid: 2, locationname: "Black", },
      { locationid: 3, locationname: "Black", },
      { locationid: 4, locationname: "Black", },
    ]
    locationData = this.locationList;
    this.locationTable = new MatTableDataSource(this.locationList);
    setTimeout(() => this.locationTable.paginator = this.paginator);
    setTimeout(() => this.locationTable.sort = this.sort);
  }
  deleteLocation(id: any) {
    this.dialog.open(this.deleteLocationDialog);
  }
  confirmdeleteLocation() {
    this.id;
  }
  searchUser(filterValue: string) {
    this.locationTable.filter = filterValue.trim().toLowerCase();
    if (this.locationTable.paginator) { this.locationTable.paginator.firstPage(); }
  }

}
