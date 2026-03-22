import { Component, inject, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { PortfolioService } from '../../core/services';
import { Experience } from '../../core/models';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, TiltDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ExperienceComponent implements AfterViewInit {
  private portfolioService = inject(PortfolioService);
  
  @ViewChild('timeline') timelineRef!: ElementRef<HTMLDivElement>;

  experiences: Experience[] = [];
  isLoading = true;
  dotPosition = 0; // % distance down the timeline
  
  constructor() {
    this.loadExperience();
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => this.onScroll(), 100);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (!this.timelineRef) return;
    
    const element = this.timelineRef.nativeElement;
    const rect = element.getBoundingClientRect();
    
    const viewportHeight = window.innerHeight;
    
    // The top of the line enters the middle of the viewport
    const startTrigger = viewportHeight / 2;
    // How far we have scrolled past the start point:
    const distancePastStart = startTrigger - rect.top;
    
    // Percentage calculated relative to the container height
    let progress = distancePastStart / rect.height;
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    
    // Multiply by 100 for percentage
    this.dotPosition = progress * 100;
  }
  
  private loadExperience(): void {
    this.portfolioService.getExperience().subscribe({
      next: (data) => {
        this.experiences = data;
        this.isLoading = false;
        setTimeout(() => this.onScroll(), 100);
      },
      error: (error) => {
        console.error('Error loading experience:', error);
        this.isLoading = false;
      }
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}