import { SubjectListType } from "./types/subject.type";
import { SubjectActions, SubjectActionsUnion } from "./subject.actions";

const subjectInitialState: SubjectListType = {
  subjectList: [],
};

export function subjectReducer(
  state = subjectInitialState,
  action: SubjectActionsUnion
): SubjectListType {
  switch (action.type) {
    case SubjectActions.FETCHED_SUBJECT:
      return {
        subjectList: action.payload,
      };
    default:
      return state;
  }
}
