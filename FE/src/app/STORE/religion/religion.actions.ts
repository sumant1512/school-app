import { Action } from "@ngrx/store";
import { ReligionType } from "./types/religion.type";

export enum ReligionActions {
  ADD_RELIGION = "[Religion] Add Religion",
  FETCH_RELIGION = "[Religion] Fetch Religion",
  FETCHED_RELIGION = "[Religion] Fetched Religion",
  DELETE_RELIGION = "[Religion] Delete Religion",
  UPDATE_RELIGION = "[Religion] Update Religion",
}

export class AddReligion implements Action {
  readonly type = ReligionActions.ADD_RELIGION;
  constructor(public payload: ReligionType) {}
}

export class FetchReligion implements Action {
  readonly type = ReligionActions.FETCH_RELIGION;
}

export class FetchedReligion implements Action {
  readonly type = ReligionActions.FETCHED_RELIGION;
  constructor(public payload: ReligionType[]) {}
}

export class DeleteReligion implements Action {
  readonly type = ReligionActions.DELETE_RELIGION;
  constructor(public payload: object) {}
}

export class UpdateReligion implements Action {
  readonly type = ReligionActions.UPDATE_RELIGION;
  constructor(public payload: object) {}
}

export type ReligionActionsUnion =
  | AddReligion
  | FetchReligion
  | FetchedReligion
  | DeleteReligion
  | UpdateReligion;
