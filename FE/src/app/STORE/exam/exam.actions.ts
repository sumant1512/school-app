import { Action } from "@ngrx/store";
import { ExamType } from "./types/exam.type";

export enum ExamActions {
  ADD_EXAM = "[Exam] Add Exam",
  FETCH_EXAM = "[Exam] Fetch Exam",
  FETCHED_EXAM = "[Exam] Fetched Exam",
  DELETE_EXAM = "[Exam] Delete Exam",
  UPDATE_EXAM = "[Exam] Update Exam",
}

export class AddExam implements Action {
  readonly type = ExamActions.ADD_EXAM;
  constructor(public payload: ExamType) {}
}

export class FetchExam implements Action {
  readonly type = ExamActions.FETCH_EXAM;
}

export class FetchedExam implements Action {
  readonly type = ExamActions.FETCHED_EXAM;
  constructor(public payload: ExamType[]) {}
}

export class DeleteExam implements Action {
  readonly type = ExamActions.DELETE_EXAM;
  constructor(public payload: object) {}
}

export class UpdateExam implements Action {
  readonly type = ExamActions.UPDATE_EXAM;
  constructor(public payload: object) {}
}

export type ExamActionsUnion =
  | AddExam
  | FetchExam
  | FetchedExam
  | DeleteExam
  | UpdateExam;
