import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AdminService } from "../../+services/admin.service";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"]
})
export class ExamComponent implements OnInit {
  addExamForm: FormGroup;
  classList: object[];
  examList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateExamId: number;
  assignData: AssignToClassType;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addExamForm = this.fb.group({
      examName: new FormControl("", Validators.required),
      selectedClass: new FormControl("")
    });
  }

  ngOnInit() {
    this.updateExamId = 0;
    this.getClass(); // to get class list on page load
    this.getExam(); // to get exam list on page load
  }

  // this is for form validation
  get validation() {
    return this.addExamForm.controls;
  }

  // function to get class list for dropdown
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to call add or update
  exam() {
    if (this.update) {
      this.updateExam();
    } else {
      this.addExam();
    }
  }

  // function to reset exam
  resetForm() {
    this.addExamForm.reset();
    this.addExamForm.markAsUntouched();
  }

  // function to add exam
  addExam() {
    this.updateExamId = 0;
    var examDetail = this.addExamForm.value;
    this.adminService.addExam(examDetail).subscribe(response => {
      if (response["status"] === true) {
        this.examList = response["data"];
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to update exam
  updateExam() {
    const examDetail = {
      examId: this.updateExamId,
      examName: this.addExamForm.value.examName
    };
    this.adminService.updateExam(examDetail).subscribe(response => {
      if (response["status"]) {
        this.examList = response["data"];
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get exam list
  getExam() {
    this.adminService.getExam().subscribe(response => {
      if (response["status"] === true) {
        this.examList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete exam
  deleteExam(examId) {
    var examDetail = {
      examId: examId
    };
    this.adminService.deleteExam(examDetail).subscribe(response => {
      if (response["status"] === true) {
        this.examList = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to activate add or update
  addExamFormOpenOrClose() {
    this.update = false;
    this.resetForm();
    this.addExamForm.addControl("selectedClass", new FormControl(""));
  }

  // function to edit exam name
  editExam(examId, examName) {
    this.update = true;
    this.updateExamId = examId;
    this.addExamForm.removeControl("selectedClass");
    this.addExamForm.get("examName").setValue(examName);
  }

  // function to assign exam to class
  assignExam(examId, examName) {
    this.assignData = {
      id_to_be_assinged: examId,
      name_to_be_assinged: examName,
      property_to_be_assinged: "exam",
      table_name: "class_with_exam",
      row_name: "exam_id"
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Assign section closed");
    });
  }
}
