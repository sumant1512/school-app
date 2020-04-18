import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";

export const fetchClass = (state: AppState) => state.classList;

// export const fetchClassList = createSelector(
//   fetchClass,
//   (state: AppState) => state.class
// );
