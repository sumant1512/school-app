import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "./app.state";
import { classReducer } from "./class/class.reducers";
import { sectionReducer } from './section/section.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  classList: classReducer,
  sectionList: sectionReducer,
};
