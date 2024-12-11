// src/app/core/services/validation.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValidationRule, CustomValidator } from '../models/validation.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private customValidators = new Map<string, CustomValidator>();

  constructor(private translateService: TranslateService) {
    // רישום ולידטורים מובנים
    this.registerValidator({
      name: 'israeliId',
      validate: this.israeliIdValidator,
      message: 'ERRORS.INVALID_ID'
    });

    this.registerValidator({
      name: 'israeliPhone',
      validate: this.israeliPhoneValidator,
      message: 'ERRORS.INVALID_PHONE'
    });

    this.registerValidator({
      name: 'password',
      validate: this.passwordValidator,
      message: 'ERRORS.INVALID_PASSWORD'
    });
  }

  // רישום ולידטור מותאם אישית
  registerValidator(validator: CustomValidator): void {
    this.customValidators.set(validator.name, validator);
  }

  // קבלת פונקציות הוולידציה עבור חוקים נתונים
  getValidators(rules: ValidationRule[]): ((control: AbstractControl) => ValidationErrors | null)[] {
    return rules.map(rule => {
      switch (rule.type) {
        case 'required':
          return Validators.required;
        case 'email':
          return Validators.email;
        case 'minLength':
          return Validators.minLength(rule.value);
        case 'maxLength':
          return Validators.maxLength(rule.value);
        case 'pattern':
          return Validators.pattern(rule.value);
        default:
          const customValidator = this.customValidators.get(rule.type);
          return customValidator ? customValidator.validate : Validators.nullValidator;
      }
    });
  }

  // קבלת הודעת שגיאה מתורגמת
  getErrorMessage(control: AbstractControl, fieldKey: string): string {
    if (!control.errors || !control.touched) return '';

    const firstError = Object.keys(control.errors)[0];
    const errorValue = control.errors[firstError];

    // טיפול בולידטורים מובנים
    if (firstError === 'required') return 'ERRORS.REQUIRED';
    if (firstError === 'email') return 'ERRORS.EMAIL';
    if (firstError === 'minlength') return this.translateService.instant('ERRORS.MIN_LENGTH', { value: errorValue.requiredLength });
    if (firstError === 'maxlength') return this.translateService.instant('ERRORS.MAX_LENGTH', { value: errorValue.requiredLength });
    if (firstError === 'pattern') return 'ERRORS.PATTERN';

    // טיפול בולידטורים מותאמים אישית
    const customValidator = this.customValidators.get(firstError);
    if (customValidator) {
      return this.translateService.instant(customValidator.message, {
        field: this.translateService.instant(`FIELDS.${fieldKey}`),
        ...errorValue
      });
    }

    return 'ERRORS.GENERAL';
  }

  // ולידטורים מובנים
  private israeliIdValidator(control: AbstractControl): ValidationErrors | null {
    const id = control.value?.toString();
    if (!id || id.length !== 9) {
      return { israeliId: true };
    }

    // אלגוריתם בדיקת ת.ז ישראלית
    let counter = 0;
    for (let i = 0; i < 9; i++) {
      let digit = Number(id.charAt(i));
      if (i % 2 === 0) {
        digit *= 1;
      } else {
        digit *= 2;
        if (digit > 9) {
          digit = 1 + (digit % 10);
        }
      }
      counter += digit;
    }
    return counter % 10 === 0 ? null : { israeliId: true };
  }

  private israeliPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value?.toString();
    const phonePattern = /^(05[0-9]|07[0-9])-?\d{7}$/;
    return !phone || !phonePattern.test(phone) ? { israeliPhone: true } : null;
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial && password.length >= 8;

    if (!valid) {
      return {
        password: {
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial,
          minLength: password.length >= 8
        }
      };
    }

    return null;
  }
}