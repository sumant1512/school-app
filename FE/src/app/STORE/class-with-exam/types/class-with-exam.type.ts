export interface ClassWithExamListType {
  classWithExamList: ClassWithExamType[];
}

export interface ClassWithExamType {
  class_id: number;
  exam_name: string;
  exam_id: number;
  assinged_on: string;
}
