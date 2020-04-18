import { ClassListType } from "./class/types/class.type";
import { SectionListType } from "./section/types/section.type";
import { ClassWithSectionListType } from "./class-with-section/types/class-with-section.type";

export type AppState = Partial<{
  classList: ClassListType;
  sectionList: SectionListType;
  classWithSectionList: ClassWithSectionListType;
}>;