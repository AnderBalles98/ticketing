import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export function MatchValidator(control: FormControl, matchingControl: FormControl): ValidatorFn {
  return () => {
    if (matchingControl.errors && !matchingControl.errors['match']) {
    } else {
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
    return null;
  }
}
