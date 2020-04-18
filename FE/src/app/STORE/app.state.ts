import { ClassListType } from "./class/types/class.type";
import { SectionListType } from "./section/types/section.type";

export type AppState = Partial<{
  classList: ClassListType;
  sectionList: SectionListType;
}>;
