import {
  ClassWithExamActionsUnion,
  ClassWithExamActions,
} from "./class-with-exam.actions";
import { ClassWithExamListType } from "./types/class-with-exam.type";

const classWithExamInitialState: ClassWithExamListType = {
  classWithExamList: [],
};

export function classWithExamReducer(
  state = classWithExamInitialState,
  action: ClassWithExamActionsUnion
): ClassWithExamListType {
  switch (action.type) {
    case ClassWithExamActions.FETCHED_CLASS_WITH_EXAM:
      return {
        classWithExamList: action.payload,
      };
    default:
      return state;
  }
}
