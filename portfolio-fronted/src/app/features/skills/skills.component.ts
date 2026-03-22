import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { PortfolioService } from '../../core/services';
import { SkillCategory } from '../../core/models';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, TiltDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('skillBounce', [
      transition(':enter', [
        query('.skill-badge', [
          style({ transform: 'scale(0)', opacity: 0 }),
          stagger(50, [
            animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'scale(1)', opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class SkillsComponent {
  private portfolioService = inject(PortfolioService);
  
  skillCategories: SkillCategory[] = [];
  isLoading = true;
  
  constructor() {
    this.loadSkills();
  }
  
  private loadSkills(): void {
    this.portfolioService.getSkillCategories().subscribe({
      next: (data) => {
        this.skillCategories = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.isLoading = false;
      }
    });
  }
  
  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 90) return '#00d4ff';
    if (proficiency >= 80) return '#7c3aed';
    if (proficiency >= 70) return '#10b981';
    return '#f59e0b';
  }
}