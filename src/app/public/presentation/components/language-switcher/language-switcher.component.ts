import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || 'es';
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLanguage);
  }
}