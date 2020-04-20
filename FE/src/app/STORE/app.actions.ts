import { ClassActionsUnion } from "./class/class.actions";
import { SectionActionsUnion } from "./section/section.actions";
import { ClassWithSectionActionsUnion } from "./class-with-section/class-with-section.actions";
import { SubjectActionsUnion } from "./subject/subject.actions";
import { ExamActionsUnion } from "./exam/exam.actions";
import { HouseActionsUnion } from "./house/house.actions";
import { CategoryActionsUnion } from "./category/category.actions";
import { ReligionActionsUnion } from "./religion/religion.actions";

export type AppActionsUnion =
  | ClassActionsUnion
  | SectionActionsUnion
  | ClassWithSectionActionsUnion
  | SubjectActionsUnion
  | ExamActionsUnion
  | HouseActionsUnion
  | CategoryActionsUnion
  | ReligionActionsUnion;
