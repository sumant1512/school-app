import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { SuppExamService } from "./api/supp-exam.service";
import { Injectable } from "@angular/core";
import {
  SuppExamActionsUnion,
  SuppExamActions,
  FetchSuppExam,
  FetchedSuppExam,
} from "./supp-exam.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class SuppExamEffects {
  constructor(
    private action$: Actions<SuppExamActionsUnion>,
    private suppExamService: SuppExamService
  ) {}

  @Effect()
  addExam$ = this.action$.pipe(
    ofType(SuppExamActions.ADD_SUPP_EXAM),
    map((action) => {
      return this.suppExamService.addSuppExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSuppExam();
        })
      );
    })
  );

  @Effect()
  fetchExam$ = this.action$.pipe(
    ofType(SuppExamActions.FETCH_SUPP_EXAM),
    map(() => {
      return this.suppExamService.fetchSuppExam();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedSuppExam(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteExam$ = this.action$.pipe(
    ofType(SuppExamActions.DELETE_SUPP_EXAM),
    map((action) => {
      return this.suppExamService.deleteSuppExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSuppExam();
        })
      );
    })
  );

  @Effect()
  updateExam$ = this.action$.pipe(
    ofType(SuppExamActions.UPDATE_SUPP_EXAM),
    map((action) => {
      return this.suppExamService.updateSuppExam(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSuppExam();
        })
      );
    })
  );
}
