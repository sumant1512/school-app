import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addSuppExamForm(): FormGroup {
  return new FormGroup({
    suppExamName: new FormControl("", Validators.required),
    selectedClass: new FormControl(""),
    selectedExam: new FormControl(""),
  });
}
