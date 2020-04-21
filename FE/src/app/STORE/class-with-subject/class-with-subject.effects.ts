import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { mergeMap, map } from "rxjs/operators";
import { ClassWithSubjectService } from "./api/class-with-subject.service";
import {
  ClassWithSubjectActionsUnion,
  ClassWithSubjectActions,
  FetchedClassWithSubject,
  FetchClassWithSubject,
} from "./class-with-subject.actions";

@Injectable()
export class ClassWithSubjectEffects {
  constructor(
    private action$: Actions<ClassWithSubjectActionsUnion>,
    private classWithSubjectService: ClassWithSubjectService
  ) {}

  @Effect()
  fetchClassWithSubject$ = this.action$.pipe(
    ofType(ClassWithSubjectActions.FETCH_CLASS_WITH_SUBJECT),
    map(() => {
      return this.classWithSubjectService.fetchClassWithSubject();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedClassWithSubject(res["data"]);
        })
      );
    })
  );

  @Effect()
  removeSubject$ = this.action$.pipe(
    ofType(ClassWithSubjectActions.REMOVE_SUBJECT),
    map((action) => {
      return this.classWithSubjectService.removeSubject(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchClassWithSubject();
        })
      );
    })
  );

}
