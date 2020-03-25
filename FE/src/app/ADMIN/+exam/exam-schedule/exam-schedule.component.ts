import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";
import { AdminService } from "../../services/admin.service";
import { MatDialog } from "@angular/material";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { SubjectWithClassType } from "./exam-schedule.type";
import { scheduleExamForm, paperDetailsForm } from "./exam-schedule.utils";

@Component({
  selector: "app-exam-schedule",
  templateUrl: "./exam-schedule.component.html",
  styleUrls: ["./exam-schedule.component.css"]
})
export class ExamScheduleComponent implements OnInit {
  timeTableColumns: string[] = [
    "subjectName",
    "examDate",
    "startTime",
    "endTime",
    "maxMarks",
    "minMarks",
    "roomNo"
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
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.scheduleExamForm = scheduleExamForm();
    this.getClass();
    this.getClassWithExam();
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

  scheduleExamFormOpen(classId, examId) {
    this.removeFormControl();  
    this.getSubjectsForClass(classId,examId);
  }

  // this function is to remove previous form control
  removeFormControl(){
    if (this.subjectWithClass) {
      this.subjectWithClass.forEach((element, index) => {
        (this.scheduleExamForm.get("paperName") as FormArray).removeAt(index);
      });
    }
  }

  getSubjectsForClass(classId,examId){
    const examDetails = { classId: classId };
    this.adminService.getSubjectForClass(examDetails).subscribe(response => {
      if (response["status"]) {
        this.subjectWithClass = response["data"];
        response["data"].forEach(paper => {
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
      examId: examId
    };
    this.adminService.checkTimeTable(examDetails).subscribe(response => {
      if (response["status"]) {
        if (response["timeTableStatus"]) {
          this.examTimeTable = response["data"];
          this.className = className;
          this.classId = classId
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
    this.adminService.scheduleExam(examDetails).subscribe(response => {
      if (response["status"] === true) {
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to delete time table
  deleteExamSchedule(classId,examId) {
    const examDetails = {
      classId: classId,
      examId: examId
    };
    console.log(examDetails);
    this.adminService.deleteExamSchedule(examDetails).subscribe(response => {
      if (response["status"] === true) {
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get all exam
  getExam() {
    this.adminService.getExam().subscribe(response => {
      if (response["status"] === true) {
        this.examList = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get class with exam
  getClassWithExam() {
    this.adminService.getClassWithExam().subscribe(response => {
      if (response["status"] === true) {
        this.classWithExam = response["data"];
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to remove exam from class
  removeExam(classId, examId) {
    let examDetail = {
      classId: classId,
      examId: examId
    };
    this.adminService.removeExam(examDetail).subscribe(response => {
      if (response["status"] === true) {
        this.getClass();
        this.getClassWithExam();
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
