import {
  TransformedAcademicRecord,
  StudentResultType,
} from "./profile-view-result.type";

export function studentAcademicRecordTransform(
  studentClassList: TransformedAcademicRecord[],
  academicRecord: StudentResultType[]
): TransformedAcademicRecord[] {
  const classList = studentClassList;
  const result = academicRecord;
  let transformedAcademicRecord: TransformedAcademicRecord[] = [];
  if (classList.length) {
    classList.filter((cls) => {
      cls.exams = [];
      if (result.length) {
        result.filter((rec) => {
          if (cls.class_id === rec.class_id) {
            const temp = {
              exam_id: rec.exam_id,
              exam_name: rec.exam_name,
              result: [],
              total_marks_obtained: 0,
              total_marks_out_of: 0,
              percentage: 0,
              status: "",
            };
            if (cls.exams.length === 0) {
              cls.exams.push(temp);
            } else {
              if (cls.exams.some((person) => person.exam_id === rec.exam_id)) {
              } else {
                cls.exams.push(temp);
              }
            }
          }
        });
      }
    });
  }
  transformedAcademicRecord = testFun(classList, academicRecord);
  return transformedAcademicRecord;
}

export function testFun(
  studentClassList: TransformedAcademicRecord[],
  academicRecord: StudentResultType[]
): TransformedAcademicRecord[] {
  studentClassList.filter((cls) => {
    cls.exams.filter((exm) => {
      let grandTotal = 0;
      let totalMarksObtained = 0;
      let percentage = 0;
      let status = [];
      academicRecord.filter((academic) => {
        if (academic.exam_id === exm.exam_id) {
          const temp = {
            paper_id: academic.paper_id,
            subject_id: academic.subject_id,
            marks_obtained: academic.marks_obtained,
            created_on: academic.created_on,
            last_updated_on: academic.last_updated_on,
            subject_name: academic.subject_name,
            total_marks: academic.total_marks,
            passing_marks: academic.passing_marks,
            student_status:
              academic.marks_obtained > academic.passing_marks
                ? "Pass"
                : "Fail",
          };
          grandTotal = grandTotal + academic.total_marks;
          totalMarksObtained = totalMarksObtained + academic.marks_obtained;
          status.push(temp.student_status);
          exm.result.push(temp);
        }
      });
      exm.total_marks_out_of = grandTotal;
      exm.total_marks_obtained = totalMarksObtained;
      exm.percentage = (totalMarksObtained / grandTotal) * 100;
      exm.status = status.includes("Fail") ? "Fail" : "Pass";
    });
  });
  return studentClassList;
}
