import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextFieldModule } from '@angular/cdk/text-field';  // חשוב להוסיף!

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { GenericInputComponent } from './components/generic-input/generic-input.component';
import { GenericTextareaComponent } from './components/generic-textarea/generic-textarea.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    GenericInputComponent,
    GenericTextareaComponent,
    SectionHeaderComponent,
    ErrorMessageComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextFieldModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    GenericInputComponent,
    GenericTextareaComponent,
    SectionHeaderComponent,
    ErrorMessageComponent,
    FileUploadComponent
  ]
})
export class SharedModule { }