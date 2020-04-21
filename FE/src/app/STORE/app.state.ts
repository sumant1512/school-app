import { ClassListType } from "./class/types/class.type";
import { SectionListType } from "./section/types/section.type";
import { ClassWithSectionListType } from "./class-with-section/types/class-with-section.type";
import { SubjectListType } from "./subject/types/subject.type";
import { ExamListType } from "./exam/types/exam.type";
import { HouseListType } from "./house/types/house.type";
import { CategoryListType } from "./category/types/category.type";
import { ReligionListType } from "./religion/types/religion.type";
import { ClassWithSubjectListType } from "./class-with-subject/types/class-with-subject.type";
import { ClassWithExamListType } from "./class-with-exam/types/class-with-exam.type";
import { StudentListType } from "./student-list/types/student-list.type";

export type AppState = Partial<{
  classList: ClassListType;
  sectionList: SectionListType;
  classWithSectionList: ClassWithSectionListType;
  subjectList: SubjectListType;
  examList: ExamListType;
  houseList: HouseListType;
  categoryList: CategoryListType;
  religionList: ReligionListType;
  classWithSubjectList: ClassWithSubjectListType;
  classWithExamList: ClassWithExamListType;
  studentList: StudentListType;
}>;
