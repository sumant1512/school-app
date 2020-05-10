export interface SuppExamListType {
  suppExamList: SuppExamType[];
}

export interface SuppExamType {
  supp_exam_id: number;
  supp_exam_name: string;
  created_on: string;
  last_updated_on: string;
}
