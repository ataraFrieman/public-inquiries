import { AbstractControl, ValidationErrors } from "@angular/forms";

// src/app/core/models/validation.model.ts
export interface ValidationError {
    type: string;
    message: string;
    params?: Record<string, any>;
  }
  
  export interface ValidationConfig {
    key: string;
    validations: ValidationRule[];
  }
  
  export interface ValidationRule {
    type: string;
    value?: any;
    message: string;
  }
  
  export interface CustomValidator {
    name: string;
    validate: (control: AbstractControl) => ValidationErrors | null;
    message: string;
  }