import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

export function feeCollectForm(): FormGroup {
  return new FormGroup({
    paymentMode: new FormControl("Cash"),
  });
}
