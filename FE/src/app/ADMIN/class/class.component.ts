import { Component, OnInit, VERSION } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { addClassForm } from "./class.utils";
import { AdminService } from "../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Store } from "@ngrx/store";
import { ClassType } from "../class-section-subject-exam-chart/class-section.type";
import * as ClassActions from "../../STORE/class/class.actions";
import * as SectionActions from "../../STORE/section/section.actions";
import * as ClassWithSectionActions from "../../STORE/class-with-section/class-with-section.actions";
import { AppState } from "src/app/STORE/app.state";
import { SectionType } from "src/app/STORE/section/types/section.type";
import { ClassWithSectionService } from "src/app/STORE/class-with-section/api/class-with-section.service";
import { ClassWithSectionType } from "src/app/STORE/class-with-section/types/class-with-section.type";
import { ClassService } from "src/app/STORE/class/api/class.service";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"],
})
export class ClassComponent implements OnInit {
  addClassForm: FormGroup;
  classList: ClassType[];
  spinner: boolean = false;
  classWithSection: ClassWithSectionType[];
  message: string;
  sectionList: SectionType[];
  constructor(
    private adminService: AdminService,
    private classService: ClassService,
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
    this.store.dispatch(new ClassActions.DeleteClass(classDetail));
  }

  // function to get section list from store
  getSection() {
    this.store.dispatch(new SectionActions.FetchSection());
    this.store.select("sectionList").subscribe((response) => {
      this.sectionList = response.sectionList;
    });
  }

  // function to get class with section
  getClassWithSection() {
    this.store.dispatch(new ClassWithSectionActions.FetchClassWithSection());
    this.store.select("classWithSectionList").subscribe((response) => {
      this.classWithSection = response.classWithSectionList;
    });
  }

  // function to remove section from class
  removeSection(classId, sectionId) {
    let sectionDetail = {
      classId: classId,
      sectionId: sectionId,
    };
    this.store.dispatch(
      new ClassWithSectionActions.RemoveSection(sectionDetail)
    );
  }
}
