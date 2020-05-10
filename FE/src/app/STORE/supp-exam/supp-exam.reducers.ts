import { SuppExamListType } from "./types/supp-exam.type";
import { SuppExamActions, SuppExamActionsUnion } from "./supp-exam.actions";

const suppExamInitialState: SuppExamListType = {
  suppExamList: [],
};

export function suppExamReducer(
  state = suppExamInitialState,
  action: SuppExamActionsUnion
): SuppExamListType {
  switch (action.type) {
    case SuppExamActions.FETCHED_SUPP_EXAM:
      return {
        suppExamList: action.payload,
      };
    default:
      return state;
  }
}
