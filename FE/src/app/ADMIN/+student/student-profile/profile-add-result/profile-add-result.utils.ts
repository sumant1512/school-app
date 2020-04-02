import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

export function addResultForm(studentId, classId): FormGroup {
  return new FormGroup({
    studentId: new FormControl(studentId, Validators.required),
    classId: new FormControl(classId, Validators.required),
    examId: new FormControl("", Validators.required),
    subjects: new FormArray([])
  });
}

export function resultForm(paper): FormGroup {
  return new FormGroup({
    paperId: new FormControl(paper.paper_id, [Validators.required]),
    subjectId: new FormControl(paper.subject_id, [Validators.required]),
    marksObtained: new FormControl("", [Validators.required])
  });
}
