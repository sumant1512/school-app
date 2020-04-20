import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addHouseForm(): FormGroup {
  return new FormGroup({
    houseName: new FormControl("", Validators.required),
  });
}
