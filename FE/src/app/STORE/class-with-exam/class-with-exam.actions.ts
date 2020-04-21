import { Action } from "@ngrx/store";
import { ClassWithExamType } from "./types/class-with-exam.type";

export enum ClassWithExamActions {
  FETCH_CLASS_WITH_EXAM = "[Class With Exam] Fetch Class With Exam",
  FETCHED_CLASS_WITH_EXAM = "[Class With Exam] Fetched Class With Exam",
  REMOVE_EXAM = "[Remove Exam] Remove Exam",
}

export class FetchClassWithExam implements Action {
  readonly type = ClassWithExamActions.FETCH_CLASS_WITH_EXAM;
}

export class FetchedClassWithExam implements Action {
  readonly type = ClassWithExamActions.FETCHED_CLASS_WITH_EXAM;
  constructor(public payload: ClassWithExamType[]) {}
}

export class RemoveExam implements Action {
  readonly type = ClassWithExamActions.REMOVE_EXAM;
  constructor(public payload: object) {}
}

export type ClassWithExamActionsUnion =
  | FetchClassWithExam
  | FetchedClassWithExam
  | RemoveExam;
