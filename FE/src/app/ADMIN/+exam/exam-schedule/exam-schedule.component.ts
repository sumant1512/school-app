import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AdminService } from "../../+services/admin.service";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { SubjectWithClassType } from "./exam-schedule.type";
import { scheduleExamForm, paperDetailsForm } from "./exam-schedule.utils";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { ClassService } from "src/app/STORE/class/api/class.service";
import { ExamService } from "src/app/STORE/exam/api/exam.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";

@Component({
  selector: "app-exam-schedule",
  templateUrl: "./exam-schedule.component.html",
  styleUrls: ["./exam-schedule.component.css"],
})
export class ExamScheduleComponent implements OnInit {
  timeTableColumns: string[] = [
    "subjectName",
    "examDate",
    "startTime",
    "endTime",
    "maxMarks",
    "minMarks",
    "roomNo",
  ];
  scheduleExamForm: FormGroup;
  classList: object[];
  spinner: boolean = false;
  classWithExam: object[];
  message: string;
  examList: object[];
  timeTable = false;
  examForm = false;
  subjectWithClass: SubjectWithClassType[];
  examTimeTable: object;
  className: string;
  classId: number;
  examName: string;
  examId: number;
  constructor(
    private adminService: AdminService,
    private classService: ClassService,
    private examService: ExamService,
    private store: Store<AppState>,
    public errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.scheduleExamForm = scheduleExamForm();
    this.fetchClass();
    this.getClassWithExam();
  }

  // function to get class list
  fetchClass() {
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  scheduleExamFormOpen(classId, examId) {
    this.removeFormControl();
    this.getSubjectsForClass(classId, examId);
  }

  // this function is to remove previous form control
  removeFormControl() {
    if (this.subjectWithClass) {
      this.subjectWithClass.forEach((element, index) => {
        (this.scheduleExamForm.get("paperName") as FormArray).removeAt(index);
      });
    }
  }

  getSubjectsForClass(classId, examId) {
    const examDetails = { classId: classId };
    this.adminService.getSubjectForClass(examDetails).subscribe((response) => {
      if (response["status"]) {
        this.subjectWithClass = response["data"];
        response["data"].forEach((paper) => {
          const control = paperDetailsForm(classId, examId, paper);
          (<FormArray>this.scheduleExamForm.get("paperName")).push(control);
        });
      }
    });
  }

  checkTimeTable(classId, examId, className, examName) {
    this.removeFormControl();
    const examDetails = {
      classId: classId,
      examId: examId,
    };
    this.adminService.checkTimeTable(examDetails).subscribe((response) => {
      if (response["status"]) {
        if (response["timeTableStatus"]) {
          this.examTimeTable = response["data"];
          this.className = className;
          this.classId = classId;
          this.examName = examName;
          this.examId = examId;
          this.timeTable = true;
          this.examForm = false;
        } else {
          this.timeTable = false;
          this.examForm = true;
          this.scheduleExamFormOpen(classId, examId);
        }
      }
    });
  }

  // function to schedule exam
  scheduleExam() {
    const examDetails = this.scheduleExamForm.value;
    this.adminService.scheduleExam(examDetails).subscribe((response) => {
      if (response["status"] === true) {
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete time table
  deleteExamSchedule(classId, examId) {
    const examDetails = {
      classId: classId,
      examId: examId,
    };
    this.adminService.deleteExamSchedule(examDetails).subscribe((response) => {
      if (response["status"] === true) {
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to fetch all exam
  getExam() {
    this.examService.fetchExam().subscribe((response) => {
      if (response["status"] === true) {
        this.examList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get class with exam
  getClassWithExam() {
    this.adminService.getClassWithExam().subscribe((response) => {
      if (response["status"] === true) {
        this.classWithExam = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to remove exam from class
  removeExam(classId, examId) {
    let examDetail = {
      classId: classId,
      examId: examId,
    };
    this.adminService.removeExam(examDetail).subscribe((response) => {
      if (response["status"] === true) {
        this.fetchClass();
        this.getClassWithExam();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
