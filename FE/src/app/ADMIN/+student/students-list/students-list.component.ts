import { Component, OnInit, Input } from "@angular/core";
import { StudentService } from "../../+services/student.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.css"]
})
export class StudentsListComponent implements OnInit {
  isExpanded: boolean = true;
  spinner = false;
  studentList: object[];
  constructor(
    private router: Router,
    private studentService: StudentService,
    private errorService: ErrorDialogFunctionsService,
    private activatedPath: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe(response => {
      if (response["status"] === true) {
        this.studentList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  getStudentDetails(studentName, studentId) {
    var studentDetailParams = {
      studentId: studentId
    };
    this.router.navigate(["profile"], {
      queryParamsHandling: "merge",
      queryParams: { studentName: studentName, studentId: studentId }
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
