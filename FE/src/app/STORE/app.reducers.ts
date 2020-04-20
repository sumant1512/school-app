import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "./app.state";
import { classReducer } from "./class/class.reducers";
import { sectionReducer } from "./section/section.reducers";
import { classWithSectionReducer } from "./class-with-section/class-with-section.reducers";
import { subjectReducer } from "./subject/subject.reducers";
import { examReducer } from "./exam/exam.reducers";

export const appReducers: ActionReducerMap<AppState> = {
  classList: classReducer,
  sectionList: sectionReducer,
  classWithSectionList: classWithSectionReducer,
  subjectList: subjectReducer,
  examList: examReducer,
};
