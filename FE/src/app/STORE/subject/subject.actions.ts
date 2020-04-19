import { Action } from "@ngrx/store";
import { SubjectType } from "./types/subject.type";

export enum SubjectActions {
  ADD_SUBJECT = "[Subject] Add Subject",
  FETCH_SUBJECT = "[Subject] Fetch Subject",
  FETCHED_SUBJECT = "[Subject] Fetched Subject",
  DELETE_SUBJECT = "[Subject] Delete Subject",
}

export class AddSubject implements Action {
  readonly type = SubjectActions.ADD_SUBJECT;
  constructor(public payload: SubjectType) {}
}

export class FetchSubject implements Action {
  readonly type = SubjectActions.FETCH_SUBJECT;
}

export class FetchedSubject implements Action {
  readonly type = SubjectActions.FETCHED_SUBJECT;
  constructor(public payload: SubjectType[]) {}
}

export class DeleteSubject implements Action {
  readonly type = SubjectActions.DELETE_SUBJECT;
  constructor(public payload: object) {}
}

export type SubjectActionsUnion =
  | AddSubject
  | FetchSubject
  | FetchedSubject
  | DeleteSubject;
