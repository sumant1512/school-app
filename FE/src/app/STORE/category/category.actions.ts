import { Action } from "@ngrx/store";
import { CategoryType } from "./types/category.type";

export enum CategoryActions {
  ADD_CATEGORY = "[Category] Add Category",
  FETCH_CATEGORY = "[Category] Fetch Category",
  FETCHED_CATEGORY = "[Category] Fetched Category",
  DELETE_CATEGORY = "[Category] Delete Category",
  UPDATE_CATEGORY = "[Category] Update Category",
}

export class AddCategory implements Action {
  readonly type = CategoryActions.ADD_CATEGORY;
  constructor(public payload: CategoryType) {}
}

export class FetchCategory implements Action {
  readonly type = CategoryActions.FETCH_CATEGORY;
}

export class FetchedCategory implements Action {
  readonly type = CategoryActions.FETCHED_CATEGORY;
  constructor(public payload: CategoryType[]) {}
}

export class DeleteCategory implements Action {
  readonly type = CategoryActions.DELETE_CATEGORY;
  constructor(public payload: object) {}
}

export class UpdateCategory implements Action {
  readonly type = CategoryActions.UPDATE_CATEGORY;
  constructor(public payload: object) {}
}

export type CategoryActionsUnion =
  | AddCategory
  | FetchCategory
  | FetchedCategory
  | DeleteCategory
  | UpdateCategory;
