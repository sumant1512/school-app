import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-assinged-subject",
  templateUrl: "./assinged-subject.component.html",
  styleUrls: ["./assinged-subject.component.css"]
})
export class AssingedSubjectComponent implements OnInit {
  classList: object[];
  spinner: boolean = false;
  classWithSubject: object[];
  message: string;
  subjectList: object[];
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getClass();
    this.getClassWithSubject();
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
        this.spinner = true;
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get all subjects
  getSubject() {
    this.adminService.getSubject().subscribe(response => {
      if (response["status"] === true) {
        this.subjectList = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get class with subjets
  getClassWithSubject() {
    this.adminService.getClassWithSubject().subscribe(response => {
      if (response["status"] === true) {
        this.classWithSubject = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to remove subject from class
  removeSubject(classId, subjectId) {
    let subjectDetail = {
      classId: classId,
      subjectId: subjectId
    };
    this.adminService.removeSubject(subjectDetail).subscribe(response => {
      if (response["status"] === true) {
        this.getClass();
        this.getClassWithSubject();
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // Error message dialog
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
