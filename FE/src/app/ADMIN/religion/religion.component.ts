import { Component, OnInit } from "@angular/core";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-religion",
  templateUrl: "./religion.component.html",
  styleUrls: ["./religion.component.css"]
})
export class ReligionComponent implements OnInit {
  addReligionForm: FormGroup;
  religionList: object[];
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.addReligionForm = this.fb.group({
      religionName: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getReligion(); // to get category list on load page
  }

  // function to reset religion form
  resetForm() {
    this.addReligionForm.reset();
    this.addReligionForm.markAsUntouched();
  }

  // function to add religion
  addReligion() {
    var religionDetail = this.addReligionForm.value;
    this.adminService.addReligion(religionDetail).subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.resetForm();
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get religion list
  getReligion() {
    this.adminService.getReligion().subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.spinner = true;
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to delete religion
  deleteReligion(religionId) {
    var religionDetail = {
      religionId: religionId
    };
    this.adminService.deleteReligion(religionDetail).subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.openDialog(response["message"]);
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
      console.log("Religion Added");
    });
  }
}
