import {
  TransformedAcademicRecord,
  StudentClassListType,
  StudentResultType,
} from "./profile-view-result.type";

export function studentAcademicRecordTransform(
  studentClassList: TransformedAcademicRecord[],
  academicRecord: StudentResultType[]
): TransformedAcademicRecord[] {
  console.log(academicRecord);
  const classList = studentClassList;
  const result = academicRecord;
  let transformedAcademicRecord: TransformedAcademicRecord[] = [];
  if (classList.length) {
    classList.filter((cls) => {
      cls.exams = [];
      if (result.length) {
        result.filter((rec) => {
          if (cls.class_id === rec.class_id) {
            cls.exams.push(rec);
          }
        });
      }
    });
  }
  transformedAcademicRecord = classList;
  return transformedAcademicRecord;
}
