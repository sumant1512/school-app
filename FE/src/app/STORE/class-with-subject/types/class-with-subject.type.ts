export interface ClassWithSubjectListType {
  classWithSubjectList: ClassWithSubjectType[];
}

export interface ClassWithSubjectType {
  class_id: number;
  subject_name: string;
  subject_id: number;
  assinged_on: string;
}
