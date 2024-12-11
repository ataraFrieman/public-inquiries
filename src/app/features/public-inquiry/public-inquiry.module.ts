import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PublicInquiryFormComponent } from './components/public-inquiry-form/public-inquiry-form.component';
import { InquiryTypeComponent } from './components/inquiry-type/inquiry-type.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';

const routes = [
    {
        path: '',
        component: PublicInquiryFormComponent
    }
];

@NgModule({
    declarations: [
        PublicInquiryFormComponent,
        InquiryTypeComponent,
        PersonalInfoComponent,
        ComplaintDetailsComponent,
        AttachmentsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatStepperModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class PublicInquiryModule { }