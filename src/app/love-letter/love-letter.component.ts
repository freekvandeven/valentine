import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { getNextPage, isLastPage } from '../config/page-flow.config';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

// Extended environment type for love letter
interface ExtendedEnvironment {
  valentineName: string;
  senderName: string;
  loveLetterParagraphs?: string[];
}

const env = environment as ExtendedEnvironment;

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, TranslateModule],
  templateUrl: './love-letter.component.html',
  styleUrl: './love-letter.component.scss'
})
export class LoveLetterComponent implements OnInit {
  valentineName = env.valentineName;
  senderName = env.senderName;
  
  // Love letter content from environment or translated defaults
  loveLetterParagraphs: string[] = [];
  
  // Track which paragraphs have been revealed
  revealedCount = signal(0);
  isFullyRevealed = computed(() => this.revealedCount() >= this.loveLetterParagraphs.length);
  isLastInFlow = isLastPage('love-letter');
  
  // Envelope animation state
  isEnvelopeOpen = signal(false);
  showLetter = signal(false);

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    // Use configured paragraphs or fall back to translated defaults
    if (env.loveLetterParagraphs && env.loveLetterParagraphs.length > 0) {
      this.loveLetterParagraphs = env.loveLetterParagraphs;
    } else {
      this.translate.get([
        'loveLetter.defaultParagraph1',
        'loveLetter.defaultParagraph2',
        'loveLetter.defaultParagraph3',
        'loveLetter.defaultParagraph4',
        'loveLetter.defaultParagraph5'
      ]).subscribe(translations => {
        this.loveLetterParagraphs = [
          translations['loveLetter.defaultParagraph1'],
          translations['loveLetter.defaultParagraph2'],
          translations['loveLetter.defaultParagraph3'],
          translations['loveLetter.defaultParagraph4'],
          translations['loveLetter.defaultParagraph5']
        ];
      });
    }
  }

  openEnvelope(): void {
    this.isEnvelopeOpen.set(true);
    // Show letter after envelope animation
    setTimeout(() => {
      this.showLetter.set(true);
      // Start revealing paragraphs one by one
      this.revealNextParagraph();
    }, 800);
  }

  private revealNextParagraph(): void {
    if (this.revealedCount() < this.loveLetterParagraphs.length) {
      setTimeout(() => {
        this.revealedCount.update(c => c + 1);
        this.revealNextParagraph();
      }, 1500);
    }
  }

  continueToNext(): void {
    const nextPage = getNextPage('love-letter');
    if (nextPage) {
      this.router.navigate(['/' + nextPage.id]);
    }
  }
}
