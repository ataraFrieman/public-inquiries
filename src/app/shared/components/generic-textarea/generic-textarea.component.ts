import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ValidationService } from '@core/services/validation.service';

@Component({
    selector: 'app-generic-textarea',
    templateUrl: './generic-textarea.component.html',
    styleUrls: ['./generic-textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTextareaComponent {
    @Input() control!: FormControl;
    @Input() fieldKey!: string;
    @Input() validationConfig?: any;
    @Input() minRows: number = 3;
    @Input() maxRows: number = 8;
    @Input() maxLength: number | null = null;
    @Input() dir: 'rtl' | 'ltr' = 'rtl';

    constructor(private validationService: ValidationService, private translationService: TranslationService) { }

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

    get charactersLeft(): number | null {
        if (!this.maxLength) return null;
        return this.maxLength - (this.control.value?.length || 0);
    }
}