import { StudentListActions, StudentListActionsUnion } from "./student-list.actions";
import { StudentListType } from "./types/student-list.type";

const studentInitialState: StudentListType = {
  studentList: [],
};

export function studentListReducer(
  state = studentInitialState,
  action: StudentListActionsUnion
): StudentListType {
  switch (action.type) {
    case StudentListActions.FETCHED_STUDENT_LIST:
      return {
        studentList: action.payload,
      };
    default:
      return state;
  }
}
