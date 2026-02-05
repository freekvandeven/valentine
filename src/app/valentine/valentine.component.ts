import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { getNextPage } from '../config/page-flow.config';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-valentine',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './valentine.component.html',
  styleUrl: './valentine.component.scss'
})
export class ValentineComponent {
  @ViewChild('zone') zone!: ElementRef<HTMLDivElement>;
  @ViewChild('noBtn') noBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('yesBtn') yesBtn!: ElementRef<HTMLButtonElement>;

  valentineName = environment.valentineName;
  senderName = environment.senderName;
  
  showResult = signal(false);
  yesScale = signal(1);
  noBtnStyle = signal({ left: 'calc(50% + 80px)', top: '50%' });
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private confettiInstance: ReturnType<typeof import('canvas-confetti').create> | null = null;
  private escapeCount = 0;

  constructor(private router: Router) {}

  onYesClick(): void {
    this.showResult.set(true);
    this.loadAndFireConfetti();
    // Navigate to next page after celebration
    setTimeout(() => {
      const nextPage = getNextPage('');
      if (nextPage) {
        this.router.navigate(['/' + nextPage.id]);
      }
    }, 3000);
  }

  onNoHover(event: MouseEvent): void {
    event.preventDefault();
  }

  private isAnimating = false;
  private animationCooldown = 300; // ms to wait before allowing another move

  onNoClick(event: MouseEvent): void {
    event.preventDefault();
    // Even on click, run away!
    if (!this.isAnimating) {
      this.moveNoButton(event.clientX, event.clientY);
      this.growYesButton();
    }
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.showResult() || !this.noBtn?.nativeElement || this.isAnimating) return;

    const btn = this.noBtn.nativeElement.getBoundingClientRect();
    const btnCenterX = btn.left + btn.width / 2;
    const btnCenterY = btn.top + btn.height / 2;
    
    const distance = Math.hypot(btnCenterX - event.clientX, btnCenterY - event.clientY);
    
    // If mouse is within 100px of the button, move it away
    if (distance < 100) {
      this.moveNoButton(event.clientX, event.clientY);
      this.growYesButton();
    }
  }

  private moveNoButton(_pointerX: number, _pointerY: number): void {
    // Prevent re-triggering during animation
    this.isAnimating = true;
    setTimeout(() => this.isAnimating = false, this.animationCooldown);

    const btn = this.noBtn.nativeElement.getBoundingClientRect();
    const yesRect = this.yesBtn?.nativeElement?.getBoundingClientRect();
    
    // Padding from edges
    const padding = 20;
    const btnWidth = btn.width;
    const btnHeight = btn.height;
    
    // Available area (viewport)
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    const minX = padding;
    const minY = padding + 150; // Keep below the title area

    // Try to find a valid random direction (up to 5 attempts)
    let newLeft = btn.left;
    let newTop = btn.top;
    let foundValidPosition = false;

    for (let attempt = 0; attempt < 5; attempt++) {
      // Completely random direction
      const randomAngle = Math.random() * Math.PI * 2;
      const dx = Math.cos(randomAngle);
      const dy = Math.sin(randomAngle);

      // Move distance varies slightly
      const moveDistance = 120 + Math.random() * 60;
      
      newLeft = btn.left + dx * moveDistance;
      newTop = btn.top + dy * moveDistance;

      // Check if position is within bounds
      const inBoundsX = newLeft >= minX && newLeft <= maxX;
      const inBoundsY = newTop >= minY && newTop <= maxY;

      if (inBoundsX && inBoundsY) {
        foundValidPosition = true;
        break;
      }
    }

    // If no valid position found after attempts, wrap to other side
    if (!foundValidPosition) {
      if (newLeft > maxX) {
        newLeft = minX + Math.random() * 100;
      } else if (newLeft < minX) {
        newLeft = maxX - Math.random() * 100;
      }
      
      if (newTop > maxY) {
        newTop = minY + Math.random() * 100;
      } else if (newTop < minY) {
        newTop = maxY - Math.random() * 100;
      }
    }

    // Avoid overlapping with Yes button
    if (yesRect) {
      const yesPadding = 30;
      const wouldOverlapX = newLeft < yesRect.right + yesPadding && newLeft + btnWidth > yesRect.left - yesPadding;
      const wouldOverlapY = newTop < yesRect.bottom + yesPadding && newTop + btnHeight > yesRect.top - yesPadding;
      
      if (wouldOverlapX && wouldOverlapY) {
        // Move to opposite side of Yes button
        if (newLeft < yesRect.left) {
          newLeft = Math.max(minX, yesRect.left - btnWidth - yesPadding - 20);
        } else {
          newLeft = Math.min(maxX, yesRect.right + yesPadding + 20);
        }
      }
    }

    this.escapeCount++;
    
    this.noBtnStyle.set({
      left: `${newLeft}px`,
      top: `${newTop}px`
    });
  }

  private growYesButton(): void {
    const currentScale = this.yesScale();
    if (currentScale < 2.2) {
      this.yesScale.set(Math.min(2.2, currentScale + 0.1));
    }
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private async loadAndFireConfetti(): Promise<void> {
    // Dynamically load canvas-confetti
    const confetti = await import('canvas-confetti');
    
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Resize canvas
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    this.confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    this.fullScreenConfetti();
  }

  private fullScreenConfetti(): void {
    if (!this.confettiInstance) return;
    
    const end = Date.now() + 1600;
    const confetti = this.confettiInstance;

    const frame = () => {
      confetti({
        particleCount: 12,
        spread: 90,
        startVelocity: 45,
        ticks: 180,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ee5a5a', '#ffd700', '#ff85a2']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst after 300ms
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 140,
        startVelocity: 60,
        ticks: 220,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ee5a5a', '#ffd700', '#ff85a2']
      });
    }, 300);
  }
}
