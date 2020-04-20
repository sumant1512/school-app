import { HouseListType } from "./types/house.type";
import { HouseActions, HouseActionsUnion } from "./house.actions";

const houseInitialState: HouseListType = {
  houseList: [],
};

export function houseReducer(
  state = houseInitialState,
  action: HouseActionsUnion
): HouseListType {
  switch (action.type) {
    case HouseActions.FETCHED_HOUSE:
      return {
        houseList: action.payload,
      };
    default:
      return state;
  }
}
