export interface SubjectListType {
  subjectList: SubjectType[];
}

export interface SubjectType {
  subject_id: number;
  subject_name: string;
  created_on: string;
  last_updated_on: string;
}
