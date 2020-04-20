import { ReligionListType } from "./types/religion.type";
import { ReligionActions, ReligionActionsUnion } from "./religion.actions";

const religionInitialState: ReligionListType = {
  religionList: [],
};

export function religionReducer(
  state = religionInitialState,
  action: ReligionActionsUnion
): ReligionListType {
  switch (action.type) {
    case ReligionActions.FETCHED_RELIGION:
      return {
        religionList: action.payload,
      };
    default:
      return state;
  }
}
