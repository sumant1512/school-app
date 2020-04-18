import { ClassType, ClassListType } from "./types/class.type";
import { ClassActions, ClassActionsUnion } from "./class.actions";

const classInitialState: ClassListType = {
  classList: [],
};

export function classReducer(
  state = classInitialState,
  action: ClassActionsUnion
): ClassListType {
  switch (action.type) {
    case ClassActions.FETCHED_CLASS:
      return {
        classList: action.payload,
      };
    default:
      return state;
  }
}
