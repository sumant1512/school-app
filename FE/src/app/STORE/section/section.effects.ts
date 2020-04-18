import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { SectionService } from "./api/section.service";
import { Injectable } from "@angular/core";
import {
  SectionActionsUnion,
  SectionActions,
  FetchSection,
  FetchedSection,
} from "./section.actions";
import { mergeMap, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { SectionType } from "./types/section.type";

@Injectable()
export class SectionEffects {
  constructor(
    private action$: Actions<SectionActionsUnion>,
    private sectionService: SectionService
  ) {}

  @Effect()
  addClass$ = this.action$.pipe(
    ofType(SectionActions.ADD_SECTION),
    map((action) => {
      return this.sectionService.addSection(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchSection();
        })
      );
    })
  );

  @Effect()
  fetchSection$ = this.action$.pipe(
    ofType(SectionActions.FETCH_SECTION),
    map((action) => {
      return this.sectionService.fetchSection();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedSection(res["data"]);
        })
      );
    })
  );
}
