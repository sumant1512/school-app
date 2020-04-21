import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AdminService } from "../../+services/admin.service";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { MatDialog } from "@angular/material";
import { ClassService } from "src/app/STORE/class/api/class.service";
import { addExamForm } from "./exam.utils";
import { ExamService } from "src/app/STORE/exam/api/exam.service";
import * as ClassActions from "src/app/STORE/class/class.actions";
import * as ExamActions from "src/app/STORE/exam/exam.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"],
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
    private classService: ClassService,
    private examService: ExamService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService,
    private store: Store<AppState>
  ) {
    this.addExamForm = addExamForm();
  }

  ngOnInit() {
    this.updateExamId = 0;
    this.fetchClass(); // to get class list on page load
    this.fetchExam(); // to get exam list on page load
  }

  // function to fetch class list for dropdown
  fetchClass() {
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  // function to call add or update
  exam() {
    this.update ? this.updateExam() : this.addExam();
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
    this.store.dispatch(new ExamActions.AddExam(examDetail));
  }

  // function to fetch exam list
  fetchExam() {
    this.store.dispatch(new ExamActions.FetchExam());
    this.store.select("examList").subscribe((response) => {
      this.examList = response.examList;
      this.spinner = true;
    });
  }

  // function to update exam
  updateExam() {
    const examDetail = {
      examId: this.updateExamId,
      examName: this.addExamForm.value.examName,
    };
    this.store.dispatch(new ExamActions.UpdateExam(examDetail));
  }

  // function to delete exam
  deleteExam(examId) {
    var examDetail = { examId: examId };
    this.store.dispatch(new ExamActions.DeleteExam(examDetail));
  }

  // function to activate add exam form
  addExamFormOpen() {
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
      row_name: "exam_id",
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Assign section closed");
    });
  }
}
