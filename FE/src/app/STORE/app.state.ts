import { ClassListType } from "./class/types/class.type";
import { SectionListType } from "./section/types/section.type";
import { ClassWithSectionListType } from "./class-with-section/types/class-with-section.type";
import { SubjectListType } from "./subject/types/subject.type";
import { ExamListType } from "./exam/types/exam.type";
import { HouseListType } from "./house/types/house.type";

export type AppState = Partial<{
  classList: ClassListType;
  sectionList: SectionListType;
  classWithSectionList: ClassWithSectionListType;
  subjectList: SubjectListType;
  examList: ExamListType;
  houseList: HouseListType;
}>;
