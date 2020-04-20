import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addReligionForm(): FormGroup {
  return new FormGroup({
    religionName: new FormControl("", Validators.required),
  });
}
