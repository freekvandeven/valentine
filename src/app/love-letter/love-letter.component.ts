import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './love-letter.component.html',
  styleUrl: './love-letter.component.scss'
})
export class LoveLetterComponent {
  valentineName = env.valentineName;
  senderName = env.senderName;
  
  // Love letter content from environment
  // Use configured paragraphs or fall back to defaults
  loveLetterParagraphs = (env.loveLetterParagraphs && env.loveLetterParagraphs.length > 0)
    ? env.loveLetterParagraphs
    : [
        'Every moment with you feels like a dream come true.',
        'Your smile lights up my entire world.',
        'I fall in love with you more and more each day.',
        'You are the most amazing person I have ever known.',
        'My heart beats only for you.'
      ];
  
  // Track which paragraphs have been revealed
  revealedCount = signal(0);
  isFullyRevealed = computed(() => this.revealedCount() >= this.loveLetterParagraphs.length);
  isLastInFlow = isLastPage('love-letter');
  
  // Envelope animation state
  isEnvelopeOpen = signal(false);
  showLetter = signal(false);

  constructor(private router: Router) {}

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
