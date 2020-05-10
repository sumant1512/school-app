import { Action } from "@ngrx/store";
import { SuppExamType } from "./types/supp-exam.type";

export enum SuppExamActions {
  ADD_SUPP_EXAM = "[Supp Exam] Add Supp Exam",
  FETCH_SUPP_EXAM = "[Supp Exam] Fetch Supp Exam",
  FETCHED_SUPP_EXAM = "[Supp Exam] Fetched Supp Exam",
  DELETE_SUPP_EXAM = "[Supp Exam] Delete Supp Exam",
  UPDATE_SUPP_EXAM = "[Supp Exam] Update Supp Exam",
}

export class AddSuppExam implements Action {
  readonly type = SuppExamActions.ADD_SUPP_EXAM;
  constructor(public payload: SuppExamType) {}
}

export class FetchSuppExam implements Action {
  readonly type = SuppExamActions.FETCH_SUPP_EXAM;
}

export class FetchedSuppExam implements Action {
  readonly type = SuppExamActions.FETCHED_SUPP_EXAM;
  constructor(public payload: SuppExamType[]) {}
}

export class DeleteSuppExam implements Action {
  readonly type = SuppExamActions.DELETE_SUPP_EXAM;
  constructor(public payload: object) {}
}

export class UpdateSuppExam implements Action {
  readonly type = SuppExamActions.UPDATE_SUPP_EXAM;
  constructor(public payload: object) {}
}

export type SuppExamActionsUnion =
  | AddSuppExam
  | FetchSuppExam
  | FetchedSuppExam
  | DeleteSuppExam
  | UpdateSuppExam;
