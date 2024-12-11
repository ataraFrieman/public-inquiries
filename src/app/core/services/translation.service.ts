import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translateService: TranslateService) { }

  get(key: string, defaultValue: string = ''): string {
    const translation = this.translateService.instant(key);
    return translation !== key ? translation : defaultValue;
  }
}