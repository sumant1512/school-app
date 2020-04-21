import { Action } from "@ngrx/store";
import { StudentType } from "./types/student-list.type";

export enum StudentListActions {
  FETCH_STUDENT_LIST = "[Student] Fetch Student List",
  FETCHED_STUDENT_LIST = "[Student] Fetched Student List",
}
export class FetchStudentList implements Action {
  readonly type = StudentListActions.FETCH_STUDENT_LIST;
}

export class FetchedStudentList implements Action {
  readonly type = StudentListActions.FETCHED_STUDENT_LIST;
  constructor(public payload: StudentType[]) {}
}

export type StudentListActionsUnion = FetchStudentList | FetchedStudentList;
