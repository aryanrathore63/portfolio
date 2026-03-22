import { Component, inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { PortfolioService } from '../../core/services';
import { Project } from '../../core/models';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ScrollAnimateDirective, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectsComponent {
  private portfolioService = inject(PortfolioService);
  
  projects: Project[] = [];
  isLoading = true;
  isLoadingMore = false;
  selectedCategory = 'All';
  categories: string[] = ['All'];
  currentProjectIndex = 0;
  
  // Pagination
  currentPage = 1;
  pageSize = 6;
  hasMoreProjects = true;
  totalCount = 0;
  
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;
  
  constructor() {
    this.loadProjects();
  }
  
  private loadProjects(): void {
    this.portfolioService.getPaginatedProjects(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.projects = response.data;
        this.hasMoreProjects = response.hasNextPage;
        this.totalCount = response.totalCount;
        this.extractCategories();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
      }
    });
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.isLoadingMore || !this.hasMoreProjects || this.isLoading) {
      return;
    }
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Load more when user is 200px from the bottom
    if (windowHeight + scrollTop >= documentHeight - 200) {
      this.loadMoreProjects();
    }
  }
  
  private loadMoreProjects(): void {
    if (this.isLoadingMore || !this.hasMoreProjects) {
      return;
    }
    
    this.isLoadingMore = true;
    this.currentPage++;
    
    this.portfolioService.getPaginatedProjects(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.projects = [...this.projects, ...response.data];
        this.hasMoreProjects = response.hasNextPage;
        this.isLoadingMore = false;
      },
      error: (error) => {
        console.error('Error loading more projects:', error);
        this.isLoadingMore = false;
        this.currentPage--; // Revert page number on error
      }
    });
  }
  
  private extractCategories(): void {
    const uniqueCategories = new Set<string>();
    this.projects.forEach(project => {
      if (project.category) {
        uniqueCategories.add(project.category);
      }
    });
    this.categories = ['All', ...Array.from(uniqueCategories)];
  }
  
  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
  
  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }
  
  prevProject(): void {
    if (this.currentProjectIndex > 0) {
      this.currentProjectIndex--;
    } else {
      this.currentProjectIndex = this.projects.length - 1;
    }
  }
  
  nextProject(): void {
    if (this.currentProjectIndex < this.projects.length - 1) {
      this.currentProjectIndex++;
    } else {
      this.currentProjectIndex = 0;
    }
  }
}