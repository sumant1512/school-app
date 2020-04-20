import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { ExamService } from "./api/exam.service";
import { Injectable } from "@angular/core";
import {
  ExamActionsUnion,
  ExamActions,
  FetchExam,
  FetchedExam,
} from "./exam.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class ExamEffects {
  constructor(
    private action$: Actions<ExamActionsUnion>,
    private examService: ExamService
  ) {}

  @Effect()
  addExam$ = this.action$.pipe(
    ofType(ExamActions.ADD_EXAM),
    map((action) => {
      return this.examService.addExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchExam();
        })
      );
    })
  );

  @Effect()
  fetchExam$ = this.action$.pipe(
    ofType(ExamActions.FETCH_EXAM),
    map(() => {
      return this.examService.fetchExam();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedExam(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteExam$ = this.action$.pipe(
    ofType(ExamActions.DELETE_EXAM),
    map((action) => {
      return this.examService.deleteExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchExam();
        })
      );
    })
  );

  @Effect()
  updateExam$ = this.action$.pipe(
    ofType(ExamActions.UPDATE_EXAM),
    map((action) => {
      return this.examService.updateExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchExam();
        })
      );
    })
  );
}
