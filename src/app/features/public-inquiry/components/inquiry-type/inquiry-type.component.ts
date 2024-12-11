import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ValidationConfig } from '@core/models/validation.model';

interface InquiryType {
  value: 'court' | 'complaint';
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

@Component({
  selector: 'app-inquiry-type',
  templateUrl: './inquiry-type.component.html',
  styleUrls: ['./inquiry-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InquiryTypeComponent,
      multi: true
    }
  ]
})
export class InquiryTypeComponent implements ControlValueAccessor {
  control = new FormControl<'court' | 'complaint' | null>(null);

  readonly validationConfig: ValidationConfig = {
    key: 'INQUIRY_TYPE',
    validations: [
      { type: 'required', message: 'INQUIRY_TYPE.ERROR.REQUIRED' }
    ]
  };

  types: InquiryType[] = [
    {
      value: 'court',
      titleKey: 'INQUIRY_TYPE.COURT.TITLE',
      descriptionKey: 'INQUIRY_TYPE.COURT.DESCRIPTION',
      icon: 'gavel'
    },
    {
      value: 'complaint',
      titleKey: 'INQUIRY_TYPE.COMPLAINT.TITLE',
      descriptionKey: 'INQUIRY_TYPE.COMPLAINT.DESCRIPTION',
      icon: 'report_problem'
    }
  ];

  disabled = false;

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: 'court' | 'complaint' | null): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  selectType(type: 'court' | 'complaint'): void {
    if (!this.disabled) {
      this.control.setValue(type);
      this.control.markAsTouched();
    }
  }
}