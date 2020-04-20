import { CategoryListType } from "./types/category.type";
import { CategoryActions, CategoryActionsUnion } from "./category.actions";

const categoryInitialState: CategoryListType = {
  categoryList: [],
};

export function categoryReducer(
  state = categoryInitialState,
  action: CategoryActionsUnion
): CategoryListType {
  switch (action.type) {
    case CategoryActions.FETCHED_CATEGORY:
      return {
        categoryList: action.payload,
      };
    default:
      return state;
  }
}
