import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

interface FileError {
  code: string;
  params?: Record<string, any>;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  @Input() control!: FormControl;
  @Input() labelKey: string = 'FILE_UPLOAD.LABEL';
  @Input() acceptedTypes: string = '*';
  @Input() maxSize: number = 10; // MB
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  
  @Output() fileSelected = new EventEmitter<File[]>();

  get hasErrors(): boolean {
    return !!this.control.errors && 'fileErrors' in this.control.errors;
  }

  getFileErrors(): FileError[] {
    if (!this.control.errors || !('fileErrors' in this.control.errors)) {
      return [];
    }
    return this.control.errors['fileErrors'] as FileError[];
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    const validFiles: File[] = [];
    const errors: FileError[] = [];

    files.forEach(file => {
      if (file.size > this.maxSize * 1024 * 1024) {
        errors.push({ 
          code: 'FILE_TOO_LARGE',
          params: { size: this.maxSize }
        });
        return;
      }
      
      if (this.acceptedTypes !== '*' && 
          !this.acceptedTypes.split(',').some(type => file.type.includes(type.trim()))) {
        errors.push({ 
          code: 'INVALID_FILE_TYPE',
          params: { types: this.acceptedTypes }
        });
        return;
      }

      validFiles.push(file);
    });

    if (errors.length) {
      this.control.setErrors({ fileErrors: errors });
      return;
    }

    this.fileSelected.emit(validFiles);
    input.value = ''; 
  }
}