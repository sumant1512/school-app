export interface TransformedAcademicRecord {
  class_id: number;
  class_name: string;
  exams: ExamResultType[];
}

export interface ExamResultType {
  exam_id: number;
  exam_name: string;
  result: SubjectResultType[];
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

const test = {
  class_id: 23,
  class_name: "2",
  exams: [
    {
      exam_id: 27,
      exam_name: "Test 1",
      result: [
        {
          paper_id: 16,
          subject_id: 6,
          marks_obtained: 5,
          created_on: "Thu Apr 02 2020 17:57:27 GMT+0530 (India Standard Time)",
          last_updated_on: null,
          subject_name: "English 2",
          total_marks: 100,
          passing_marks: 33
        }
      ]
    }
  ]
};
