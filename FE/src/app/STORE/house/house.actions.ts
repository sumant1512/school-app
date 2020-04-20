import { Action } from "@ngrx/store";
import { HouseType } from "./types/house.type";

export enum HouseActions {
  ADD_HOUSE = "[House] Add House",
  FETCH_HOUSE = "[House] Fetch House",
  FETCHED_HOUSE = "[House] Fetched House",
  DELETE_HOUSE = "[House] Delete House",
  UPDATE_HOUSE = "[House] Update House",
}

export class AddHouse implements Action {
  readonly type = HouseActions.ADD_HOUSE;
  constructor(public payload: HouseType) {}
}

export class FetchHouse implements Action {
  readonly type = HouseActions.FETCH_HOUSE;
}

export class FetchedHouse implements Action {
  readonly type = HouseActions.FETCHED_HOUSE;
  constructor(public payload: HouseType[]) {}
}

export class DeleteHouse implements Action {
  readonly type = HouseActions.DELETE_HOUSE;
  constructor(public payload: object) {}
}

export class UpdateHouse implements Action {
  readonly type = HouseActions.UPDATE_HOUSE;
  constructor(public payload: object) {}
}

export type HouseActionsUnion =
  | AddHouse
  | FetchHouse
  | FetchedHouse
  | DeleteHouse
  | UpdateHouse;
