import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ApiserviceService } from '../../../../services/apiservice.service';

@Component({
  selector: 'app-delete-commission',
  templateUrl: './delete-commission.component.html',
  styleUrls: ['./delete-commission.component.scss']
})
export class DeleteCommissionComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  message: string = ""
  cancelButtonText = "Cancel"
  constructor(public dialogRef: MatDialogRef<DeleteCommissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}