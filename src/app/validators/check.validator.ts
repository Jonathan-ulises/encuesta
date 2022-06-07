import { AbstractControl, FormArray } from '@angular/forms';

export function ValidateChecks(control: FormArray) {
    if (control.controls.some(x => x.value == true)) {
        return null;
    }
    return { invalidCheckList: true };
}

export function ValidateUrl(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
      return { invalidUrl: true };
    }
    return null;
  }