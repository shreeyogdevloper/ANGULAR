import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function modelCodeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = /^[a-zA-Z0-9]{10}$/.test(control.value);
    return valid ? null : {'invalidModelCode': {value: control.value}};
  };
}

@Directive({
  selector: '[appModelCodeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ModelCodeValidatorDirective, multi: true}]
})
export class ModelCodeValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return modelCodeValidator()(control);
  }
}