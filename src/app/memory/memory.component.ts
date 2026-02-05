import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { getNextPage } from '../config/page-flow.config';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss'
})
export class MemoryComponent implements OnInit {
  valentineName = environment.valentineName;
  
  // Valentine-themed emojis for the cards
  private readonly cardEmojis = ['💕', '💖', '💝', '💗', '🌹', '🥰', '😘', '💐'];
  
  cards = signal<Card[]>([]);
  flippedCards = signal<Card[]>([]);
  moves = signal(0);
  isLocked = signal(false);
  
  isGameComplete = computed(() => {
    const allCards = this.cards();
    return allCards.length > 0 && allCards.every(card => card.isMatched);
  });
  
  matchedPairs = computed(() => {
    return this.cards().filter(card => card.isMatched).length / 2;
  });
  
  totalPairs = computed(() => this.cardEmojis.length);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    // Create pairs of cards
    const cardPairs: Card[] = [];
    
    this.cardEmojis.forEach((emoji, index) => {
      // Create two cards for each emoji
      cardPairs.push(
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle the cards
    this.cards.set(this.shuffleArray(cardPairs));
    this.flippedCards.set([]);
    this.moves.set(0);
    this.isLocked.set(false);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  flipCard(card: Card): void {
    // Don't flip if:
    // - Game is locked (checking for match)
    // - Card is already flipped
    // - Card is already matched
    // - Already have 2 cards flipped
    if (
      this.isLocked() ||
      card.isFlipped ||
      card.isMatched ||
      this.flippedCards().length >= 2
    ) {
      return;
    }

    // Flip the card
    const updatedCards = this.cards().map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    this.cards.set(updatedCards);
    
    const flipped = [...this.flippedCards(), { ...card, isFlipped: true }];
    this.flippedCards.set(flipped);

    // Check for match when 2 cards are flipped
    if (flipped.length === 2) {
      this.moves.update(m => m + 1);
      this.checkForMatch(flipped[0], flipped[1]);
    }
  }

  private checkForMatch(card1: Card, card2: Card): void {
    this.isLocked.set(true);

    if (card1.emoji === card2.emoji) {
      // Match found!
      setTimeout(() => {
        const updatedCards = this.cards().map(c =>
          c.emoji === card1.emoji ? { ...c, isMatched: true } : c
        );
        this.cards.set(updatedCards);
        this.flippedCards.set([]);
        this.isLocked.set(false);
      }, 500);
    } else {
      // No match - flip cards back
      setTimeout(() => {
        const updatedCards = this.cards().map(c =>
          c.id === card1.id || c.id === card2.id
            ? { ...c, isFlipped: false }
            : c
        );
        this.cards.set(updatedCards);
        this.flippedCards.set([]);
        this.isLocked.set(false);
      }, 1000);
    }
  }

  resetGame(): void {
    this.initializeGame();
  }

  continueToNext(): void {
    const nextPage = getNextPage('memory');
    if (nextPage) {
      this.router.navigate(['/' + nextPage.id]);
    }
  }
}
