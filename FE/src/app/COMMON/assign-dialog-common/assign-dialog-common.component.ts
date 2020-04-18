import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AssignToClassType } from "./assign-dialog.type";
import { ErrorDialogFunctionsService } from "../error-message-dialog/error-dialog-functions.service";
import { ClassService } from 'src/app/STORE/class/api/class.service';

@Component({
  selector: "app-assign-dialog-common",
  templateUrl: "./assign-dialog-common.component.html",
  styleUrls: ["./assign-dialog-common.component.css"],
})
export class AssignDialogCommonComponent implements OnInit {
  assignForm: FormGroup;
  classList: object[];
  constructor(
    private adminService: AdminService,
    private classService: ClassService,
    private errorService: ErrorDialogFunctionsService,
    public dialogRef: MatDialogRef<AssignDialogCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public assignData: AssignToClassType
  ) {
    this.assignForm = new FormGroup({
      selectedClass: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.fetchClass();
  }

  // function to get class list
  fetchClass() {
    this.classService.fetchClass().subscribe((response) => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to assign section to class
  assignToClass() {
    let classDetail = {
      assignData: this.assignData,
      selectedClass: this.assignForm.value,
    };
    this.adminService.assignToClass(classDetail).subscribe((response) => {
      if (response["status"] === true) {
        this.dialogRef.close();
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
