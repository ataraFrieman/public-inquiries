import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { ValidationConfig } from '@core/models/validation.model';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintDetailsComponent implements OnInit {
  form!: FormGroup;
  parentForm!: FormGroup;

  readonly validations: Record<string, ValidationConfig> = {
    required: {
      key: 'default',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' }
      ]
    },
    caseNumber: {
      key: 'CASE_NUMBER',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' },
        { type: 'pattern', message: 'ERRORS.CASE_NUMBER_FORMAT', value: '^\\d{1,6}-\\d{2}-\\d{2}$' }
      ]
    },
    description: {
      key: 'DESCRIPTION',
      validations: [
        { type: 'required', message: 'ERRORS.REQUIRED' },
        { type: 'minLength', message: 'ERRORS.MIN_LENGTH', value: 20 }
      ]
    }
  };

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control.get('complaintDetails') as FormGroup;
    this.parentForm = this.rootFormGroup.control;
  }

  get inquiryType(): 'court' | 'complaint' | null {
    return this.parentForm.get('inquiryType')?.value;
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}