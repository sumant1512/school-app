import { Component, OnInit, Inject } from '@angular/core';
import { ErrorMessageDialogComponent } from '../error-message-dialog/error-message-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/ADMIN/services/admin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssignToClassType } from './assign-dialog.type';

@Component({
  selector: 'app-assign-dialog-common',
  templateUrl: './assign-dialog-common.component.html',
  styleUrls: ['./assign-dialog-common.component.css']
})
export class AssignDialogCommonComponent implements OnInit {
  assignForm: FormGroup;
  classList: object[];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AssignDialogCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public assignData: AssignToClassType
  ) {
    this.assignForm = new FormGroup({
      selectedClass: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getClass();
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to assign section to class
  assignToClass() {
    let classDetail = {
      assignData: this.assignData,
      selectedClass: this.assignForm.value
    };
    console.log(classDetail);
    this.adminService.assignToClass(classDetail).subscribe(response => {
      if (response["status"] === true) {
        this.dialogRef.close();
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // Error message
  openDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      width: "750px",
      data: { message: errorMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Class Added");
    });
  }
}
