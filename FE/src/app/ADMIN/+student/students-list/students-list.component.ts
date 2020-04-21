import { Component, OnInit, Input } from "@angular/core";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "src/app/STORE/student-list/api/student.service";
import { StudentType } from "src/app/STORE/student-list/types/student-list.type";
import * as StudentListActions from "../../../STORE/student-list/student-list.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"],
})
export class StudentsListComponent implements OnInit {
  isExpanded: boolean = true;
  spinner: boolean = false;
  studentList: StudentType[];
  constructor(private router: Router, private store: Store<AppState>) {}

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
}
