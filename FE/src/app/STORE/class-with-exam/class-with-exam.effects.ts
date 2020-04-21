import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { mergeMap, map } from "rxjs/operators";
import { ClassWithExamService } from "./api/class-with-exam.service";
import {
  ClassWithExamActionsUnion,
  ClassWithExamActions,
  FetchedClassWithExam,
  FetchClassWithExam,
} from "./class-with-exam.actions";

@Injectable()
export class ClassWithExamEffects {
  constructor(
    private action$: Actions<ClassWithExamActionsUnion>,
    private classWithExamService: ClassWithExamService
  ) {}

  @Effect()
  fetchClassWithExam$ = this.action$.pipe(
    ofType(ClassWithExamActions.FETCH_CLASS_WITH_EXAM),
    map(() => {
      return this.classWithExamService.fetchClassWithExam();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedClassWithExam(res["data"]);
        })
      );
    })
  );

  @Effect()
  removeExam$ = this.action$.pipe(
    ofType(ClassWithExamActions.REMOVE_EXAM),
    map((action) => {
      return this.classWithExamService.removeExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchClassWithExam();
        })
      );
    })
  );
}
