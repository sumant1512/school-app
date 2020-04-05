import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { resultForm, addResultForm } from "./profile-add-result.utils";
import { FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-profile-add-result",
  templateUrl: "./profile-add-result.component.html",
  styleUrls: ["./profile-add-result.component.css"]
})
export class ProfileAddResultComponent implements OnInit {
  @Input() selectedStudentDetail: object;
  addResultForm: FormGroup;
  paperList: object[];
  examList: object[];
  resultBtn = false;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.addResultForm = addResultForm(
      this.selectedStudentDetail["studentId"],
      this.selectedStudentDetail["classId"]
    );
    this.getExamsForClass();
  }

  // function to save result
  saveStudentResult() {
    const result = this.addResultForm.value;
    this.adminService.saveStudentResult(result).subscribe(response => {
      if (response["status"]) {
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get subject list for result
  openResultCreateForm() {
    const examDetail = this.addResultForm.value;
    this.adminService
      .getSubjectForSelectedExamResultCreate(examDetail)
      .subscribe(response => {
        if (response["status"]) {
          if (!response["data"].length) {
            this.errorService.openErrorDialog("Exam is not scheduled");
          } else {
            this.paperList = response["data"];
            response["data"].forEach(paper => {
              const control = resultForm(paper);
              (<FormArray>this.addResultForm.get("subjects")).push(control);
            });
            this.resultBtn = true;
          }
        }
      });
  }

  // function to get exam list
  getExamsForClass() {
    const classDetail = { classId: this.selectedStudentDetail["classId"] };
    this.adminService.getExamsForClass(classDetail).subscribe(response => {
      if (response["status"]) {
        this.examList = response["data"];
      }
    });
  }
}
