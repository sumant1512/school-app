import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { ReligionService } from "./api/religion.service";
import { Injectable } from "@angular/core";
import {
  ReligionActionsUnion,
  ReligionActions,
  FetchReligion,
  FetchedReligion,
} from "./religion.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class ReligionEffects {
  constructor(
    private action$: Actions<ReligionActionsUnion>,
    private religionService: ReligionService
  ) {}

  @Effect()
  addReligion$ = this.action$.pipe(
    ofType(ReligionActions.ADD_RELIGION),
    map((action) => {
      return this.religionService.addReligion(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchReligion();
        })
      );
    })
  );

  @Effect()
  fetchReligion$ = this.action$.pipe(
    ofType(ReligionActions.FETCH_RELIGION),
    map(() => {
      return this.religionService.fetchReligion();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedReligion(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteReligion$ = this.action$.pipe(
    ofType(ReligionActions.DELETE_RELIGION),
    map((action) => {
      return this.religionService.deleteReligion(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchReligion();
        })
      );
    })
  );

  @Effect()
  updateReligion$ = this.action$.pipe(
    ofType(ReligionActions.UPDATE_RELIGION),
    map((action) => {
      return this.religionService.updateReligion(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchReligion();
        })
      );
    })
  );
}
