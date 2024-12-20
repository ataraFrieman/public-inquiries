import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  @Input() titleKey!: string;
  @Input() descriptionKey?: string;
  @Input() icon?: string;
  @Input() class?: string;
}