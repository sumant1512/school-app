import { Component, OnInit } from "@angular/core";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as ClassActions from "src/app/STORE/class/class.actions";
import * as ClassWithSubjectActions from "src/app/STORE/class-with-subject/class-with-subject.actions";
import { ClassWithSubjectType } from "src/app/STORE/class-with-subject/types/class-with-subject.type";
import { ClassType } from "../../class-section-subject-exam-chart/class-section.type";

@Component({
  selector: "app-assinged-subject",
  templateUrl: "./assinged-subject.component.html",
  styleUrls: ["./assinged-subject.component.css"],
})
export class AssingedSubjectComponent implements OnInit {
  classList: ClassType[];
  spinner: boolean = false;
  classWithSubject: ClassWithSubjectType[];
  message: string;
  constructor(
    private store: Store<AppState>,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.fetchClass();
    this.fetchClassWithSubject();
  }

  // function to get class list
  fetchClass() {
    this.store.dispatch(new ClassActions.FetchClass());
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  // function to fetch class with subjets
  fetchClassWithSubject() {
    this.store.dispatch(new ClassWithSubjectActions.FetchClassWithSubject());
    this.store.select("classWithSubjectList").subscribe((response) => {
      this.classWithSubject = response.classWithSubjectList;
    });
  }

  // function to remove subject from class
  removeSubject(classId, subjectId) {
    let subjectDetail = {
      classId: classId,
      subjectId: subjectId,
    };
    this.store.dispatch(
      new ClassWithSubjectActions.RemoveSubject(subjectDetail)
    );
  }
}
