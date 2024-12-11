import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ValidationService } from '@core/services/validation.service';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() fieldKey!: string;
  @Input() type: 'text' | 'email' | 'tel' | 'number' | 'password' = 'text';
  @Input() validationConfig?: any;
  @Input() maxLength: number | null = null;
  @Input() dir: 'rtl' | 'ltr' = 'rtl';
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() autocomplete?: string;
  @Input() showClear: boolean = true;

  constructor(private validationService: ValidationService,private translationService:TranslationService) { }

  ngOnInit() {
    if (this.validationConfig) {
      const validators = this.validationService.getValidators(this.validationConfig.validations);
      this.control.setValidators(validators);
      this.control.updateValueAndValidity();
    }
  }

  get label(): string {
    return this.translationService.get(`${this.fieldKey}.LABEL`, '');

  }

  get placeholder(): string {
    return this.translationService.get(`${this.fieldKey}.PLACEHOLDER`, '');

  }

  get hint(): string {
    return this.translationService.get(`${this.fieldKey}.HINT`, '');

  }

  get errorMessage(): string {
    return this.validationService.getErrorMessage(this.control, this.fieldKey);
  }

  get isRequired(): boolean {
    return this.validationConfig?.validations.some((v: any) => v.type === 'required') ?? false;
  }

  get showPasswordToggle(): boolean {
    return this.type === 'password';
  }

  get showClearButton(): boolean {
    return this.showClear && !!this.control.value;
  }

  clearInput(): void {
    this.control.setValue('');
    this.control.markAsTouched();
  }

  togglePasswordVisibility(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}