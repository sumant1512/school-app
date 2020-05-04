export interface StudentResultType {
  student_id: number;
  class_id: number;
  exam_id: number;
  paper_id: number;
  subject_id: number;
  marks_obtained: number;
  created_on: string;
  last_updated_on: string;
  exam_name: string;
  subject_name: string;
  total_marks: number;
  passing_marks: number;
}

export interface TransformedAcademicRecord {
  class_id: number;
  class_name: string;
  exams: ExamResultType[];
}

export interface ExamResultType {
  exam_id: number;
  exam_name: string;
  result?: SubjectResultType[];
  total_marks_obtained?: number;
  total_marks_out_of?: number;
  percentage?: number;
  status?: string;
}

export interface SubjectResultType {
  paper_id: number;
  subject_id: number;
  marks_obtained: number;
  created_on: string;
  last_updated_on: string;
  subject_name: string;
  total_marks: number;
  passing_marks: number;
}
