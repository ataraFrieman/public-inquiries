import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('he');
    translate.use('he');
    document.dir = 'rtl';
  }
}