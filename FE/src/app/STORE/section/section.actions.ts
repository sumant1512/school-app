import { Action } from "@ngrx/store";
import { SectionType } from "./types/section.type";

export enum SectionActions {
  ADD_SECTION = "[Section] Add Section",
  FETCH_SECTION = "[Section] Fetch Section",
  FETCHED_SECTION = "[Section] Fetched Section",
  DELETE_SECTION = "[Section] Delete Section",
}

export class AddSection implements Action {
  readonly type = SectionActions.ADD_SECTION;
  constructor(public payload: SectionType) {}
}

export class FetchSection implements Action {
  readonly type = SectionActions.FETCH_SECTION;
}

export class FetchedSection implements Action {
  readonly type = SectionActions.FETCHED_SECTION;
  constructor(public payload: SectionType[]) {}
}

export class DeleteSection implements Action {
  readonly type = SectionActions.DELETE_SECTION;
  constructor(public payload: object) {}
}

export type SectionActionsUnion =
  | AddSection
  | FetchSection
  | FetchedSection
  | DeleteSection;
