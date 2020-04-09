import { Component, OnInit, VERSION } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { addClassForm } from "./class.utils";
import { AdminService } from "../+services/admin.service";
import { classListReturnType } from "src/app/COMMON/shared-function.type";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"]
})
export class ClassComponent implements OnInit {
  addClassForm: FormGroup;
  classList: classListReturnType;
  spinner: boolean = false;
  classWithSection: object[];
  message: string;
  allSections: object[];
  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addClassForm = addClassForm();
  }

  ngOnInit() {
    this.getClass();
    this.getSection();
    this.getClassWithSection();
  }

  // function to reset class form
  resetForm() {
    this.addClassForm.reset();
    this.addClassForm.markAsUntouched();
  }

  // function to add class
  addClass() {
    const classDetail = this.addClassForm.value;
    this.adminService.addClass(classDetail).subscribe(response => {
      if (response["status"] == true) {
        this.getClass();
        this.getSection();
        this.getClassWithSection();
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete class
  deleteClass(classId) {
    var classDetail = {
      classId: classId
    };
    this.adminService.deleteClass(classDetail).subscribe(response => {
      if (response["status"] == true) {
        this.getClass();
        this.getSection();
        this.getClassWithSection();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get all sections
  getSection() {
    this.adminService.getSection().subscribe(response => {
      if (response["status"] === true) {
        this.allSections = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get class with section
  getClassWithSection() {
    this.adminService.getClassWithSection().subscribe(response => {
      if (response["status"] === true) {
        this.classWithSection = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to remove section from class
  removeSection(classId, sectionId) {
    let sectionDetail = {
      classId: classId,
      sectionId: sectionId
    };
    this.adminService.removeSection(sectionDetail).subscribe(response => {
      if (response["status"] === true) {
        this.getClass();
        this.getSection();
        this.getClassWithSection();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
