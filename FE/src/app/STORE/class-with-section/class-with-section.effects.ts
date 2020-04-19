import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { mergeMap, map } from "rxjs/operators";
import { ClassWithSectionService } from "./api/class-with-section.service";
import {
  ClassWithSectionActionsUnion,
  ClassWithSectionActions,
  FetchedClassWithSection,
  FetchClassWithSection,
} from "./class-with-section.actions";

@Injectable()
export class ClassWithSectionEffects {
  constructor(
    private action$: Actions<ClassWithSectionActionsUnion>,
    private classWithSectionService: ClassWithSectionService
  ) {}

  @Effect()
  fetchClassWithSection$ = this.action$.pipe(
    ofType(ClassWithSectionActions.FETCH_CLASS_WITH_SECTION),
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
  removeSection$ = this.action$.pipe(
    ofType(ClassWithSectionActions.REMOVE_SECTION),
    map((action) => {
      return this.classWithSectionService.removeSection(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchClassWithSection();
        })
      );
    })
  );

}
