import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface ValidationRule {
  type: string;
  value?: any;
  message: string;
}

export interface ValidationConfig {
  key: string;
  validations: ValidationRule[];
}

export interface CustomValidator {
  name: string;
  validate: (control: AbstractControl) => ValidationErrors | null;
  message: string;
}