import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
} from "@angular/forms";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { MatDialog } from "@angular/material";
import * as ClassActions from "../../../STORE/class/class.actions";
import * as SuppExamActions from "src/app/STORE/supp-exam/supp-exam.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import { addSuppExamForm } from './supplimentry-exam.utils';
import { AdminService } from '../../+services/admin.service';

@Component({
  selector: 'app-supplimentry-exam',
  templateUrl: './supplimentry-exam.component.html',
  styleUrls: ['./supplimentry-exam.component.css']
})
export class SupplimentryExamComponent implements OnInit {
  addSuppExamForm: FormGroup;
  classList: object[];
  examList: object[];
  suppExamList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateExamId: number;
  assignData: AssignToClassType;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private store: Store<AppState>
  ) {
    this.addSuppExamForm = addSuppExamForm();
  }

  ngOnInit() {
    this.updateExamId = 0;
    this.fetchClass(); // to get class list on page load
    this.fetchSuppExam(); // to get exam list on page load
  }

  // function to fetch class list for dropdown
  fetchClass() {
    this.store.select("classList").subscribe((response) => {
      if(response.classList.length === 0){
        this.store.dispatch(new ClassActions.FetchClass());
        this.store.select("classList").subscribe((response) => {
          this.classList = response.classList;
          this.spinner = true;
        })
      }else{
        this.classList = response.classList;
        this.spinner = true;
      }
    });
  }

  // function to call add or update
  exam() {
    this.update ? this.updateSuppExam() : this.addSuppExam();
  }

  // function to reset exam
  resetForm() {
    this.addSuppExamForm.reset();
    this.addSuppExamForm.markAsUntouched();
  }

  // function to add supp exam
  addSuppExam() {
    this.updateExamId = 0;
    var suppExamDetail = this.addSuppExamForm.value;
    console.log(suppExamDetail);
    this.store.dispatch(new SuppExamActions.AddSuppExam(suppExamDetail));
    this.fetchSuppExam();
  }

  // function to fetch supp exam list
  fetchSuppExam() {
    this.store.dispatch(new SuppExamActions.FetchSuppExam());
    this.store.select("suppExamList").subscribe((response) => {
      this.suppExamList = response.suppExamList;
      this.spinner = true;
    });
  }

  // function to update exam
  updateSuppExam() {
    const examDetail = {
      examId: this.updateExamId,
      examName: this.addSuppExamForm.value.examName,
    };
    this.store.dispatch(new SuppExamActions.UpdateSuppExam(examDetail));
  }

  // function to delete exam
  deleteSuppExam(examId) {
    var examDetail = { examId: examId };
    this.store.dispatch(new SuppExamActions.DeleteSuppExam(examDetail));
  }

  // function to activate add exam form
  addSuppExamFormOpen() {
    this.update = false;
    this.resetForm();
    this.addSuppExamForm.addControl("selectedClass", new FormControl(""));
  }

  // function to edit supp exam name
  editSuppExam(examId, examName) {
    this.update = true;
    this.updateExamId = examId;
    this.addSuppExamForm.removeControl("selectedClass");
    this.addSuppExamForm.get("examName").setValue(examName);
  }

  //function to fetch exam for class
  fetchExamForClass(event){
    console.log(event.value)
    const classDetail = { classId:  event.value};
    this.adminService.getExamsForClass(classDetail).subscribe(response => {
      if (response["status"]) {
        this.examList = response["data"];
      }
    });
  }

  // function to assign exam to class
  assignSuppExam(examId, examName) {
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
