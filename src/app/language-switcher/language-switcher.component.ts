import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent implements OnInit {
  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];
  
  currentLanguage: Language;
  isOpen = false;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.languages[0];
  }

  ngOnInit(): void {
    // Get saved language or use default
    const savedLang = localStorage.getItem('valentine-lang');
    const langCode = savedLang || this.translate.getDefaultLang() || 'en';
    
    this.currentLanguage = this.languages.find(l => l.code === langCode) || this.languages[0];
    this.translate.use(this.currentLanguage.code);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language): void {
    this.currentLanguage = lang;
    this.translate.use(lang.code);
    localStorage.setItem('valentine-lang', lang.code);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
