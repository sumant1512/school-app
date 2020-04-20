import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { CategoryService } from "./api/category.service";
import { Injectable } from "@angular/core";
import {
  CategoryActionsUnion,
  CategoryActions,
  FetchCategory,
  FetchedCategory,
} from "./category.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class CategoryEffects {
  constructor(
    private action$: Actions<CategoryActionsUnion>,
    private categoryService: CategoryService
  ) {}

  @Effect()
  addCategory$ = this.action$.pipe(
    ofType(CategoryActions.ADD_CATEGORY),
    map((action) => {
      return this.categoryService.addCategory(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchCategory();
        })
      );
    })
  );

  @Effect()
  fetchCategory$ = this.action$.pipe(
    ofType(CategoryActions.FETCH_CATEGORY),
    map(() => {
      return this.categoryService.fetchCategory();
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedCategory(res["data"]);
        })
      );
    })
  );

  @Effect()
  deleteCategory$ = this.action$.pipe(
    ofType(CategoryActions.DELETE_CATEGORY),
    map((action) => {
      return this.categoryService.deleteCategory(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchCategory();
        })
      );
    })
  );

  @Effect()
  updateCategory$ = this.action$.pipe(
    ofType(CategoryActions.UPDATE_CATEGORY),
    map((action) => {
      return this.categoryService.updateCategory(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchCategory();
        })
      );
    })
  );
}
