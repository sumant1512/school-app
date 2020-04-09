import { FormGroup, FormControl, Validators } from "@angular/forms";

export function addInstallmentForm(): FormGroup {
  return new FormGroup({
    installmentName: new FormControl("", Validators.required),
    installmentAmount: new FormControl("", Validators.required),
    selectedClass: new FormControl("")
  });
}
