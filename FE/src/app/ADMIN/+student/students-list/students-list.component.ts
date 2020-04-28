import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { StudentType } from "src/app/STORE/student-list/types/student-list.type";
import * as StudentListActions from "../../../STORE/student-list/student-list.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import { MatDialog } from "@angular/material";
import { StudentPromoteDialogComponent } from "src/app/COMMON/student-promote-dialog/student-promote-dialog.component";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit {
  isExpanded: boolean = true;
  spinner: boolean = false;
  studentList: StudentType[];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.fetchStudentList();
  }

  fetchStudentList() {
    this.store.dispatch(new StudentListActions.FetchStudentList());
    this.store.select("studentList").subscribe((response) => {
      this.studentList = response.studentList;
      this.spinner = true;
    });
  }

  getStudentProfile(studentName, studentId) {
    var studentDetailParams = {
      studentName: studentName,
      studentId: studentId,
    };
    this.router.navigate(["profile"], {
      queryParamsHandling: "merge",
      queryParams: studentDetailParams,
    });
  }

  expansionPanel(status) {
    if (status == "false") {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  // function to open dialog for student promote
  openDialogForStudentPromote(studentId, classId, sectionId, session) {
    let studentPromoteDetail = {
      studentId: studentId,
      classId: classId,
      sectionId: sectionId,
      session: session,
    };
    const dialogRef = this.dialog.open(StudentPromoteDialogComponent, {
      width: "500px",
      data: studentPromoteDetail,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Assign dialog closed");
    });
  }
}
