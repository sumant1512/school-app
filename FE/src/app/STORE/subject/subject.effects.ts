import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { SubjectService } from "./api/subject.service";
import { Injectable } from "@angular/core";
import {
  SubjectActionsUnion,
  SubjectActions,
  FetchSubject,
  FetchedSubject,
} from "./subject.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class SubjectEffects {
  constructor(
    private action$: Actions<SubjectActionsUnion>,
    private subjectService: SubjectService
  ) {}

  @Effect()
  addSubject$ = this.action$.pipe(
    ofType(SubjectActions.ADD_SUBJECT),
    map((action) => {
      return this.subjectService.addSubject(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSubject();
        })
      );
    })
  );

  @Effect()
  fetchSubject$ = this.action$.pipe(
    ofType(SubjectActions.FETCH_SUBJECT),
    map(() => {
      return this.subjectService.fetchSubject();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedSubject(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteSubject$ = this.action$.pipe(
    ofType(SubjectActions.DELETE_SUBJECT),
    map((action) => {
      return this.subjectService.deleteSubject(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSubject();
        })
      );
    })
  );

  @Effect()
  updateSubject$ = this.action$.pipe(
    ofType(SubjectActions.UPDATE_SUBJECT),
    map((action) => {
      return this.subjectService.updateSubject(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSubject();
        })
      );
    })
  );
}
