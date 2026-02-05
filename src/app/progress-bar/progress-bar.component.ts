import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getEnabledPages, getProgressInfo, PageConfig } from '../config/page-flow.config';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {
  @Input() currentPageId: string = '';
  
  pages: PageConfig[] = [];
  currentIndex: number = 0;
  percentage: number = 0;

  ngOnInit(): void {
    this.pages = getEnabledPages();
    const progressInfo = getProgressInfo(this.currentPageId);
    this.currentIndex = progressInfo.currentIndex;
    this.percentage = progressInfo.percentage;
  }
}
