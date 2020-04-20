import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addExamForm(): FormGroup {
  return new FormGroup({
    examName: new FormControl("", Validators.required),
    selectedClass: new FormControl(""),
  });
}
