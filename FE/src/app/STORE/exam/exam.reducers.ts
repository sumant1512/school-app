import { ExamListType } from "./types/exam.type";
import { ExamActions, ExamActionsUnion } from "./exam.actions";

const examInitialState: ExamListType = {
  examList: [],
};

export function examReducer(
  state = examInitialState,
  action: ExamActionsUnion
): ExamListType {
  switch (action.type) {
    case ExamActions.FETCHED_EXAM:
      return {
        examList: action.payload,
      };
    default:
      return state;
  }
}
