import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, TranslateModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {
  valentineName = environment.valentineName;
  senderName = environment.senderName;

  private intervalId: ReturnType<typeof setInterval> | null = null;
  
  timeLeft = signal<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  isValentinesDay = computed(() => this.timeLeft().total <= 0);

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown(): void {
    // Valentine's Day 2026, midnight in Amsterdam (CET = UTC+1, but Feb is winter so no DST)
    // February 14, 2026 00:00:00 Amsterdam time = February 13, 2026 23:00:00 UTC
    const valentinesDay = new Date('2026-02-14T00:00:00+01:00');
    const now = new Date();
    const diff = valentinesDay.getTime() - now.getTime();

    if (diff <= 0) {
      this.timeLeft.set({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.timeLeft.set({ days, hours, minutes, seconds, total: diff });
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
