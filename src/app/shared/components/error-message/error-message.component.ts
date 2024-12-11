import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  @Input() messageKey!: string;
  @Input() params?: { [key: string]: any };
  @Input() type: 'error' | 'warning' = 'error';
}