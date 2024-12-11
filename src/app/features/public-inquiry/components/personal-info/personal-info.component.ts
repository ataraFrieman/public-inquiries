import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { ValidationConfig } from '@core/models/validation.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent implements OnInit {
  form!: FormGroup;

  readonly validations: Record<string, ValidationConfig> = {
    required: {
      key: 'default',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' }
      ]
    },
    idNumber: {
      key: 'ID_NUMBER',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' },
        { type: 'israeliId', message: 'ERRORS.INVALID_ID' }
      ]
    },
    phone: {
      key: 'PHONE',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' },
        { type: 'israeliPhone', message: 'ERRORS.INVALID_PHONE' }
      ]
    },
    email: {
      key: 'EMAIL',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' },
        { type: 'email', message: 'ERRORS.EMAIL' }
      ]
    }
  };

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control.get('personalInfo') as FormGroup;
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}