import { Action } from "@ngrx/store";
import { ClassWithSectionType } from "./types/class-with-section.type";

export enum ClassWithSectionActions {
  FETCH_CLASS_WITH_SECTION = "[Class With Section] Fetch Class With Section",
  FETCHED_CLASS_WITH_SECTION = "[Class With Section] Fetched Class With Section",
  REMOVE_SECTION = "[Remove Section] Remove Section",
}

export class FetchClassWithSection implements Action {
  readonly type = ClassWithSectionActions.FETCH_CLASS_WITH_SECTION;
}

export class FetchedClassWithSection implements Action {
  readonly type = ClassWithSectionActions.FETCHED_CLASS_WITH_SECTION;
  constructor(public payload: ClassWithSectionType[]) {}
}

export class RemoveSection implements Action {
  readonly type = ClassWithSectionActions.REMOVE_SECTION;
  constructor(public payload: object) {}
}

export type ClassWithSectionActionsUnion =
  | FetchClassWithSection
  | FetchedClassWithSection
  | RemoveSection;
