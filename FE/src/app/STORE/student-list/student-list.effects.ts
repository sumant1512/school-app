import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { StudentService } from "./api/student.service";
import { Injectable } from "@angular/core";
import {
  StudentListActionsUnion,
  StudentListActions,
  FetchedStudentList,
} from "./student-list.actions";
import { mergeMap, map } from "rxjs/operators";
@Injectable()
export class StudentListEffects {
  constructor(
    private action$: Actions<StudentListActionsUnion>,
    private studentService: StudentService
  ) {}

  @Effect()
  fetchStudentList$ = this.action$.pipe(
    ofType(StudentListActions.FETCH_STUDENT_LIST),
    map((action) => {
      return this.studentService.fetchStudentList();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedStudentList(res["data"]);
        })
      );
    })
  );
}
