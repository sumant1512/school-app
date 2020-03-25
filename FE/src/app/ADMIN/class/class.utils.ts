import { FormGroup, FormControl, Validators } from '@angular/forms';

export function addClassForm(): FormGroup {
    return new FormGroup({
        className:  new FormControl("", Validators.required),
        selectedSections:  new FormControl("")
    })
}