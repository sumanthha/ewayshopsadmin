import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiserviceService } from '../../../../../services/apiservice.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.scss']
})
export class DeleteCategoriesComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  message: string = ""
  cancelButtonText = "Cancel"
  constructor(public dialogRef: MatDialogRef<DeleteCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}