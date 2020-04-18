import { SectionType, SectionListType } from "./types/section.type";
import { SectionActions, SectionActionsUnion } from "./section.actions";

const sectionInitialState: SectionListType = {
  sectionList: [],
};

export function sectionReducer(
  state = sectionInitialState,
  action: SectionActionsUnion
): SectionListType {
  switch (action.type) {
    case SectionActions.FETCHED_SECTION:
      return {
        sectionList: action.payload,
      };
    default:
      return state;
  }
}
