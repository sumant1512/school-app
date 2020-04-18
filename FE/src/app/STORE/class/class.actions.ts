import { Action } from "@ngrx/store";
import { ClassType } from "./types/class.type";

export enum ClassActions {
  ADD_CLASS = "[Class] Add Class",
  FETCH_CLASS = "[Class] Fetch Class",
  FETCHED_CLASS = "[Class] Fetched Class",
}

export class AddClass implements Action {
  readonly type = ClassActions.ADD_CLASS;
  constructor(public payload: ClassType) {}
}

export class FetchClass implements Action {
  readonly type = ClassActions.FETCH_CLASS;
}

export class FetchedClass implements Action {
  readonly type = ClassActions.FETCHED_CLASS;
  constructor(public payload: ClassType[]) {}
}

export type ClassActionsUnion = AddClass | FetchClass | FetchedClass;
