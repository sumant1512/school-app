import {
  ClassWithSubjectActionsUnion,
  ClassWithSubjectActions,
} from "./class-with-subject.actions";
import { ClassWithSubjectListType } from "./types/class-with-subject.type";

const classWithSubjectInitialState: ClassWithSubjectListType = {
  classWithSubjectList: [],
};

export function classWithSubjectReducer(
  state = classWithSubjectInitialState,
  action: ClassWithSubjectActionsUnion
): ClassWithSubjectListType {
  switch (action.type) {
    case ClassWithSubjectActions.FETCHED_CLASS_WITH_SUBJECT:
      return {
        classWithSubjectList: action.payload,
      };
    default:
      return state;
  }
}
