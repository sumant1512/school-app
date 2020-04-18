import { Component, OnInit, VERSION } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { addClassForm } from "./class.utils";
import { AdminService } from "../+services/admin.service";
import { classListReturnType } from "src/app/COMMON/shared-function.type";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { ClassService } from "src/app/STORE/class/api/class.service";
import { ClassWithSectionService } from "src/app/STORE/class-with-section/api/class-with-section.service";
import { Store } from "@ngrx/store";
import { ClassType } from "../class-section-subject-exam-chart/class-section.type";
import * as ClassActions from "../../STORE/class/class.actions";
import * as SectionActions from "../../STORE/section/section.actions";
import { AppState } from "src/app/STORE/app.state";
import { ClassListType } from "src/app/STORE/class/types/class.type";
import { SectionService } from "src/app/STORE/section/api/section.service";
import { SectionListType, SectionType } from "src/app/STORE/section/types/section.type";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"],
})
export class ClassComponent implements OnInit {
  addClassForm: FormGroup;
  classList: ClassType[];
  spinner: boolean = false;
  classWithSection: object[];
  message: string;
  sectionList: SectionType[];
  constructor(
    private adminService: AdminService,
    private classWithSectionService: ClassWithSectionService,
    private errorService: ErrorDialogFunctionsService,
    private store: Store<AppState>
  ) {
    this.addClassForm = addClassForm();
  }

  ngOnInit() {
    this.fetchClass();
    this.getSection();
    this.getClassWithSection();
  }

  // function to reset class form
  resetForm() {
    this.addClassForm.reset();
    this.addClassForm.markAsUntouched();
  }

  // function to get class list
  fetchClass() {
    this.store.dispatch(new ClassActions.FetchClass());
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  // function to add class
  addClass() {
    const classDetail = this.addClassForm.value;
    this.store.dispatch(new ClassActions.AddClass(classDetail));
    this.resetForm();
  }

  // function to delete class
  deleteClass(classId) {
    var classDetail = {
      classId: classId,
    };
    this.adminService.deleteClass(classDetail).subscribe((response) => {
      if (response["status"] == true) {
        this.fetchClass();
        this.getClassWithSection();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get all sections
  getSection() {
    this.store.dispatch(new SectionActions.FetchSection());
    this.store.select("sectionList").subscribe((response) => {
      this.sectionList = response.sectionList;
    });
  }

  // function to get class with section
  getClassWithSection() {
    this.classWithSectionService.getClassWithSection().subscribe((response) => {
      if (response["status"] === true) {
        this.classWithSection = response["data"]["class"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to remove section from class
  removeSection(classId, sectionId) {
    let sectionDetail = {
      classId: classId,
      sectionId: sectionId,
    };
    this.adminService.removeSection(sectionDetail).subscribe((response) => {
      if (response["status"] === true) {
        this.getClassWithSection();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
