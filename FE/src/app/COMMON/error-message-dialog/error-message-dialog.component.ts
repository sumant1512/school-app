import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialog } from 'src/app/ADMIN/section/section.component';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrls: ['./error-message-dialog.component.css']
})
export class ErrorMessageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialog) {}

  ngOnInit() {
  }

  closeMessage(): void {
    this.dialogRef.close();
  }
}
