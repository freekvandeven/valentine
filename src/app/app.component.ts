import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageSwitcherComponent],
  template: `
    <app-language-switcher></app-language-switcher>
    <router-outlet></router-outlet>
  `,
  styles: [':host { display: block; }']
})
export class AppComponent {
  title = 'valentine-app';
}
