import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { HouseService } from "./api/house.service";
import { Injectable } from "@angular/core";
import {
  HouseActionsUnion,
  HouseActions,
  FetchHouse,
  FetchedHouse,
} from "./house.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class HouseEffects {
  constructor(
    private action$: Actions<HouseActionsUnion>,
    private houseService: HouseService
  ) {}

  @Effect()
  addHouse$ = this.action$.pipe(
    ofType(HouseActions.ADD_HOUSE),
    map((action) => {
      return this.houseService.addHouse(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchHouse();
        })
      );
    })
  );

  @Effect()
  fetchHouse$ = this.action$.pipe(
    ofType(HouseActions.FETCH_HOUSE),
    map(() => {
      return this.houseService.fetchHouse();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedHouse(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteHouse$ = this.action$.pipe(
    ofType(HouseActions.DELETE_HOUSE),
    map((action) => {
      return this.houseService.deleteHouse(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchHouse();
        })
      );
    })
  );

  @Effect()
  updateHouse$ = this.action$.pipe(
    ofType(HouseActions.UPDATE_HOUSE),
    map((action) => {
      return this.houseService.updateHouse(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchHouse();
        })
      );
    })
  );
}
