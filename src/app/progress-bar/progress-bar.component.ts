import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { getEnabledPages, getProgressInfo, PageConfig } from '../config/page-flow.config';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {
  @Input() currentPageId: string = '';
  
  pages: PageConfig[] = [];
  currentIndex: number = 0;
  percentage: number = 0;
  
  // Only allow skipping in development mode
  isDevMode = !environment.production;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pages = getEnabledPages();
    const progressInfo = getProgressInfo(this.currentPageId);
    this.currentIndex = progressInfo.currentIndex;
    this.percentage = progressInfo.percentage;
  }

  navigateToStep(page: PageConfig): void {
    if (this.isDevMode) {
      this.router.navigate(['/' + page.id]);
    }
  }
}
