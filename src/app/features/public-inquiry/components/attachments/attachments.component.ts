import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationConfig } from '@core/models/validation.model';

interface FileTypeConfig {
  type: string;
  maxSize: number;
  acceptedTypes: string;
  labelKey: string;
  required: boolean;
}

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private formSubscription?: Subscription;
  currentInquiryType: 'court' | 'complaint' | null = null;

  readonly fileTypes: Record<'court' | 'complaint', FileTypeConfig[]> = {
    court: [
      {
        type: 'courtDocument',
        maxSize: 10,
        acceptedTypes: '.pdf,.doc,.docx',
        labelKey: 'ATTACHMENTS.COURT.DOCUMENT.LABEL',
        required: true
      },
      {
        type: 'additionalDocs',
        maxSize: 10,
        acceptedTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        labelKey: 'ATTACHMENTS.COURT.ADDITIONAL.LABEL',
        required: false
      }
    ],
    complaint: [
      {
        type: 'mainDocument',
        maxSize: 10,
        acceptedTypes: '.pdf,.doc,.docx',
        labelKey: 'ATTACHMENTS.COMPLAINT.DOCUMENT.LABEL',
        required: true
      },
      {
        type: 'evidence',
        maxSize: 20,
        acceptedTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        labelKey: 'ATTACHMENTS.COMPLAINT.EVIDENCE.LABEL',
        required: false
      }
    ]
  };

  readonly validations: Record<string, ValidationConfig> = {
    required: {
      key: 'FILE',
      validations: [
        { type: 'required', message: 'ATTACHMENTS.ERRORS.REQUIRED' }
      ]
    }
  };

  constructor(
    private rootFormGroup: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.rootFormGroup.control;

    this.formSubscription = this.form.get('inquiryType')?.valueChanges.subscribe(value => {
      console.log('Inquiry Type Changed:', value);
      this.currentInquiryType = value;
      this.initializeFormControls();
      this.cdr.markForCheck();
    });

    this.currentInquiryType = this.form.get('inquiryType')?.value;
    this.initializeFormControls();
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  get inquiryType(): 'court' | 'complaint' | null {
    return this.currentInquiryType;
  }

  get currentFileTypes(): FileTypeConfig[] {
    return this.inquiryType ? this.fileTypes[this.inquiryType] : [];
  }

  private initializeFormControls(): void {
    const attachmentsGroup = this.form.get('attachments') as FormGroup;

    if (this.currentInquiryType) {
      this.fileTypes[this.currentInquiryType].forEach(fileType => {
        if (!attachmentsGroup.contains(fileType.type)) {
          attachmentsGroup.addControl(fileType.type, new FormControl(null));
        }
      });
    }
  }

  getControl(name: string): FormControl {
    const attachmentsGroup = this.form.get('attachments') as FormGroup;
    return attachmentsGroup.get(name) as FormControl;
  }

  onFileSelected(fileType: FileTypeConfig, files: File[]): void {
    const control = this.getControl(fileType.type);

    if (fileType.type === 'additionalDocs' || fileType.type === 'evidence') {
      const currentFiles = control.value || [];
      control.setValue([...currentFiles, ...files]);
    } else {
      control.setValue(files[0]);
    }
  }

  removeFile(fileType: FileTypeConfig, index: number): void {
    const control = this.getControl(fileType.type);
    if (Array.isArray(control.value)) {
      const files = [...control.value];
      files.splice(index, 1);
      control.setValue(files);
    } else {
      control.setValue(null);
    }

    if (fileType.required && !control.value) {
      control.setErrors({ required: true });
    }
  }

  getFiles(fileType: FileTypeConfig): File[] {
    const control = this.getControl(fileType.type);
    const value = control.value;
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }

  getFileIcon(type: string): string {
    if (type.includes('pdf')) return 'picture_as_pdf';
    if (type.includes('image')) return 'image';
    if (type.includes('word') || type.includes('document')) return 'description';
    return 'insert_drive_file';
  }

  getFileSize(size: number): string {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
}