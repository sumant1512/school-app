import {
  ClassWithSectionActionsUnion,
  ClassWithSectionActions,
} from "./class-with-section.actions";
import { ClassWithSectionListType } from "./types/class-with-section.type";

const classWithSectionInitialState: ClassWithSectionListType = {
  classWithSectionList: [],
};

export function classWithSectionReducer(
  state = classWithSectionInitialState,
  action: ClassWithSectionActionsUnion
): ClassWithSectionListType {
  switch (action.type) {
    case ClassWithSectionActions.FETCHED_CLASS_WITH_SECTION:
      return {
        classWithSectionList: action.payload,
      };
    default:
      return state;
  }
}
