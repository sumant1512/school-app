import { Action } from "@ngrx/store";
import { ClassWithSubjectType } from "./types/class-with-subject.type";

export enum ClassWithSubjectActions {
  FETCH_CLASS_WITH_SUBJECT = "[Class With Subject] Fetch Class With Subject",
  FETCHED_CLASS_WITH_SUBJECT = "[Class With Subject] Fetched Class With Subject",
  REMOVE_SUBJECT = "[Remove Subject] Remove Subject",
}

export class FetchClassWithSubject implements Action {
  readonly type = ClassWithSubjectActions.FETCH_CLASS_WITH_SUBJECT;
}

export class FetchedClassWithSubject implements Action {
  readonly type = ClassWithSubjectActions.FETCHED_CLASS_WITH_SUBJECT;
  constructor(public payload: ClassWithSubjectType[]) {}
}

export class RemoveSubject implements Action {
  readonly type = ClassWithSubjectActions.REMOVE_SUBJECT;
  constructor(public payload: object) {}
}

export type ClassWithSubjectActionsUnion =
  | FetchClassWithSubject
  | FetchedClassWithSubject
  | RemoveSubject;
