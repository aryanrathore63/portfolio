import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PortfolioService } from '../../core/services';
import { Achievement } from '../../core/models';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { FloatingEmojisDirective } from '../../shared/directives/floating-emojis.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollAnimateDirective, TiltDirective, FloatingEmojisDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  developer = environment.developer;
  private portfolioService = inject(PortfolioService);

  achievements: Achievement[] = [];
  isLoading = true;

  getAvatarInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter(n => n && n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  constructor() {
    this.loadAchievements();
  }

  private loadAchievements(): void {
    this.portfolioService.getAchievements().subscribe({
      next: (data) => {
        this.achievements = data.slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading achievements:', error);
        this.isLoading = false;
      }
    });
  }
}