import { TransformedAcademicRecord } from "./profile-view-result.type";

export function studentAcademicTransform(academicRecord) {
  console.log(academicRecord);
  // let transformedAcademicRecord: TransformedAcademicRecord[];
  // let classWithSectionTransformed = [];
  // academicRecord.filter(result => {
  //   transformedAcademicRecord.filter(transformedResult => {
        
  //   })
  // });
  // return classWithSectionTransformed;
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
