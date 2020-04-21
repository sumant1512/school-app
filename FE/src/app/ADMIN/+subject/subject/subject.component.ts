import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { SubjectService } from "src/app/STORE/subject/api/subject.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as ClassActions from "src/app/STORE/class/class.actions";
import * as SubjectActions from "src/app/STORE/subject/subject.actions";
import { addSubjectForm } from "./subject.utils";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"],
})
export class SubjectComponent implements OnInit {
  addSubjectForm: FormGroup;
  classList: object[];
  subjectList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateSubjectId: number;
  assignData: AssignToClassType;

  constructor(
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService,
    private store: Store<AppState>
  ) {
    this.addSubjectForm = addSubjectForm();
  }

  ngOnInit() {
    this.updateSubjectId = 0;
    this.fetchSubject(); // to get subject list on page load
    this.fetchClass(); // to get class list on page load
  }

  // function to reset subject form
  resetForm() {
    this.addSubjectForm.reset();
    this.addSubjectForm.markAsUntouched();
  }

  // function to get class list for dropdown
  fetchClass() {
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  // function to call add or update
  subject() {
    this.update ? this.updateSubject() : this.addSubject();
  }

  // function to add subject
  addSubject() {
    var subjectDetail = this.addSubjectForm.value;
    this.store.dispatch(new SubjectActions.AddSubject(subjectDetail));
  }

  // function to update subject
  updateSubject() {
    const subjectDetail = {
      subjectId: this.updateSubjectId,
      subjectName: this.addSubjectForm.value.subjectName,
    };
    this.store.dispatch(new SubjectActions.UpdateSubject(subjectDetail));
    this.resetForm();
  }

  // function to fetch subject list
  fetchSubject() {
    this.store.dispatch(new SubjectActions.FetchSubject());
    this.store.select("subjectList").subscribe((response) => {
      this.subjectList = response.subjectList;
      this.spinner = true;
    });
  }

  // function to delete subject
  deleteSubject(subjectId) {
    var subjectDetail = {
      subjectId: subjectId,
    };
    this.store.dispatch(new SubjectActions.DeleteSubject(subjectDetail));
  }

  // function to activate add or update
  addSubjectFormOpen() {
    this.update = false;
    this.resetForm();
    this.addSubjectForm.addControl("selectedClass", new FormControl(""));
  }

  // function to edit subject name
  editSubject(subjectId, subjectName) {
    this.update = true;
    this.updateSubjectId = subjectId;
    this.addSubjectForm.removeControl("selectedClass");
    this.addSubjectForm.get("subjectName").setValue(subjectName);
  }

  // function to assign subject to class
  assignSubject(subjectId, subjectName) {
    this.assignData = {
      id_to_be_assinged: subjectId,
      name_to_be_assinged: subjectName,
      property_to_be_assinged: "subject",
      table_name: "class_with_subjects",
      row_name: "subject_id",
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Assign dialog closed");
    });
  }
}
