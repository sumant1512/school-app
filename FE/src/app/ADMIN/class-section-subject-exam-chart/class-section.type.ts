export interface ClassWithSectionType {
  class: ClassType;
  sections?: SectionType[];
}

export interface ClassType {
  class_id: number;
  class_name: string;
  created_on: string;
  last_updated_on: string;
}

export interface SectionType {
  class_id: number;
  section_name: string;
  section_id: number;
  assinged_on: string;
}
