export interface ExamListType {
  examList: ExamType[];
}

export interface ExamType {
  exam_id: number;
  exam_name: string;
  created_on: string;
  last_updated_on: string;
}
