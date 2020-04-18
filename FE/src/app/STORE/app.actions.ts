import { ClassActionsUnion } from "./class/class.actions";
import { SectionActionsUnion } from "./section/section.actions";

export type AppActionsUnion = ClassActionsUnion | SectionActionsUnion;
