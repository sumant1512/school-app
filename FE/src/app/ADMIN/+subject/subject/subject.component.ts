import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { AdminService } from "../../+services/admin.service";
import { MatDialog } from "@angular/material";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"]
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
    private adminService: AdminService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addSubjectForm = new FormGroup({
      subjectName: new FormControl("", Validators.required),
      selectedClass: new FormControl("")
    });
  }

  ngOnInit() {
    this.updateSubjectId = 0;
    this.getSubject(); // to get subject list on page load
    this.getClass(); // to get class list on page load
  }

  // this is for form validation
  get validation() {
    return this.addSubjectForm.controls;
  }

  // function to reset subject form
  resetExamForm() {
    this.addSubjectForm.reset();
    this.addSubjectForm.markAsUntouched();
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
  subject() {
    if (this.update) {
      this.updateSubject();
    } else {
      this.addSubject();
    }
  }

  // function to add subject
  addSubject() {
    var subjectDetail = this.addSubjectForm.value;
    this.adminService.addSubject(subjectDetail).subscribe(response => {
      if (response["status"] === true) {
        this.subjectList = response["data"];
        this.resetExamForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to update subject
  updateSubject() {
    const subjectDetail = {
      subjectId: this.updateSubjectId,
      subjectName: this.addSubjectForm.value.subjectName
    };
    this.adminService.updateSubject(subjectDetail).subscribe(response => {
      if (response["status"]) {
        this.subjectList = response["data"];
        this.resetExamForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get subject list
  getSubject() {
    this.adminService.getSubject().subscribe(response => {
      if (response["status"] === true) {
        this.subjectList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete subject
  deleteSubject(subjectId) {
    var subjectDetail = {
      subjectId: subjectId
    };
    this.adminService.deleteSubject(subjectDetail).subscribe(response => {
      if (response["status"] === true) {
        this.subjectList = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to activate add or update
  addSubjectFormOpenOrClose() {
    this.update = false;
    this.resetExamForm();
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
      row_name: "subject_id"
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Assign dialog closed");
    });
  }
}
