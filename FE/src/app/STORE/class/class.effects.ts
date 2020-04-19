import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { ClassService } from "./api/class.service";
import { Injectable } from "@angular/core";
import {
  ClassActionsUnion,
  ClassActions,
  FetchClass,
  FetchedClass,
} from "./class.actions";
import { mergeMap, map } from "rxjs/operators";
import {
  FetchedClassWithSection,
  ClassWithSectionActions,
} from "../class-with-section/class-with-section.actions";
import { ClassWithSectionService } from "../class-with-section/api/class-with-section.service";

@Injectable()
export class ClassEffects {
  constructor(
    private action$: Actions<ClassActionsUnion>,
    private classService: ClassService,
    private classWithSectionService: ClassWithSectionService
  ) {}

  @Effect()
  addClass$ = this.action$.pipe(
    ofType(ClassActions.ADD_CLASS),
    map((action) => {
      return this.classService.addClass(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchClass();
        })
      );
    })
  );

  @Effect()
  fetchClass$ = this.action$.pipe(
    ofType(ClassActions.FETCH_CLASS),
    map((action) => {
      return this.classService.fetchClass();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedClass(res['data']);
        })
      );
    })
  );

  @Effect()
  fetchClassWithSection$ = this.action$.pipe(
    ofType(ClassActions.FETCHED_CLASS),
    map((action) => {
      return this.classWithSectionService.fetchClassWithSection();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedClassWithSection(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteClass$ = this.action$.pipe(
    ofType(ClassActions.DELETE_CLASS),
    map((action) => {
      return this.classService.deleteClass(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchClass();
        })
      );
    })
  );
}
