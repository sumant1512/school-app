import { FormGroup, FormControl, Validators } from '@angular/forms';

export function addSectionForm(): FormGroup {
    return new FormGroup({
        sectionName: new FormControl("", Validators.required)
    })
}