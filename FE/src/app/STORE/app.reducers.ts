import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "./app.state";
import { classReducer } from "./class/class.reducers";
import { sectionReducer } from "./section/section.reducers";
import { classWithSectionReducer } from "./class-with-section/class-with-section.reducers";
import { subjectReducer } from "./subject/subject.reducers";
import { examReducer } from "./exam/exam.reducers";
import { houseReducer } from "./house/house.reducers";
import { categoryReducer } from "./category/category.reducers";
import { religionReducer } from "./religion/religion.reducers";
import { classWithSubjectReducer } from "./class-with-subject/class-with-subject.reducers";
import { classWithExamReducer } from "./class-with-exam/class-with-exam.reducers";
import { studentListReducer } from "./student-list/student-list.reducers";

export const appReducers: ActionReducerMap<AppState> = {
  classList: classReducer,
  sectionList: sectionReducer,
  classWithSectionList: classWithSectionReducer,
  subjectList: subjectReducer,
  examList: examReducer,
  houseList: houseReducer,
  categoryList: categoryReducer,
  religionList: religionReducer,
  classWithSubjectList: classWithSubjectReducer,
  classWithExamList: classWithExamReducer,
  studentList: studentListReducer,
};
