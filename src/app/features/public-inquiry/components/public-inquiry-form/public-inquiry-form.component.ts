import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public-inquiry-form',
  templateUrl: './public-inquiry-form.component.html',
  styleUrls: ['./public-inquiry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicInquiryFormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  form!: FormGroup;
  isLinear = true;
  stepperOrientation$: Observable<'horizontal' | 'vertical'> = this.breakpointObserver
    .observe('(max-width: 768px)')
    .pipe(
      map(({ matches }) => matches ? 'vertical' : 'horizontal')
    );

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      inquiryType: ['complaint', Validators.required],
      personalInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        idNumber: ['', Validators.required],
        address: ['', Validators.required]
      }),
      complaintDetails: this.fb.group({
        caseNumber: [''],
        courtName: [''],
        subject: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(20)]]
      }),
      attachments: this.fb.group({})
    });

    this.form.get('inquiryType')?.valueChanges.subscribe(type => {
      this.updateCourtFieldsValidation(type);
    });
  }

  private initStepperOrientation(): void {
    this.stepperOrientation$ = this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(
        map(({ matches }) => matches ? 'vertical' : 'horizontal')
      );
  }

  private updateCourtFieldsValidation(type: 'court' | 'complaint' | null): void {
    const caseNumberControl = this.form.get('complaintDetails.caseNumber');
    const courtNameControl = this.form.get('complaintDetails.courtName');

    if (type === 'court') {
      caseNumberControl?.setValidators([Validators.required]);
      courtNameControl?.setValidators([Validators.required]);
    } else {
      caseNumberControl?.clearValidators();
      courtNameControl?.clearValidators();
    }

    caseNumberControl?.updateValueAndValidity();
    courtNameControl?.updateValueAndValidity();
  }

  canProceed(stepper: MatStepper): void {
    const currentStep = stepper.selectedIndex;
    let formGroup: FormGroup;

    switch (currentStep) {
      case 0:
        if (this.form.get('inquiryType')?.valid) {
          stepper.next();
        }
        break;
      case 1:
        formGroup = this.form.get('personalInfo') as FormGroup;
        if (formGroup.valid) {
          stepper.next();
        } else {
          this.markFormGroupTouched(formGroup);
        }
        break;
      case 2:
        formGroup = this.form.get('complaintDetails') as FormGroup;
        if (formGroup.valid) {
          stepper.next();
        } else {
          this.markFormGroupTouched(formGroup);
        }
        break;
      default:
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      alert("Sucssses")
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  canSubmit(): boolean {
    return this.form.valid;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}