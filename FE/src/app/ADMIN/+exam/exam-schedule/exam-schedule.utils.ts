import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export function scheduleExamForm(): FormGroup {
    return new FormGroup({
        paperName: new FormArray([])
    })
}

export function paperDetailsForm(classId,examId,paper): FormGroup {
    return new FormGroup({
        classId: new FormControl(classId),
        examId: new FormControl(examId),
        subjectId: new FormControl(paper.subject_id),
        totalMarks: new FormControl("100", [Validators.required]),
        passingMarks: new FormControl("33", [Validators.required]),
        paperDate: new FormControl("", [Validators.required]),
        paperStartTime: new FormControl("8:00 AM", [Validators.required]),
        paperEndTime: new FormControl("11:00 AM", [Validators.required]),
        roomNumber: new FormControl("12", [Validators.required])
    })
}