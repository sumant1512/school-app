import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { ClassService } from "./api/class.service";
import { Injectable } from "@angular/core";
import {
  ClassActionsUnion,
  ClassActions,
  AddClass,
  FetchClass,
  FetchedClass,
} from "./class.actions";
import {
  mergeMap,
  share,
  filter,
  map,
  withLatestFrom,
  switchMap,
  mapTo,
} from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { ClassType } from "./types/class.type";
import { of } from "rxjs";

@Injectable()
export class ClassEffects {
  constructor(
    private action$: Actions<ClassActionsUnion>,
    private classService: ClassService
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
          return new FetchedClass(res["data"]);
        })
      );
    })
  );
}
