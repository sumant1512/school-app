import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addSubjectForm(): FormGroup {
  return new FormGroup({
    subjectName: new FormControl("", Validators.required),
    selectedClass: new FormControl(""),
  });
}
