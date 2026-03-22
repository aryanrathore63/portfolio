import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  
  title = 'Aryan Rathore | Full Stack Developer';
  isLoading = true;
  
  constructor() {
    // Initialize theme
    this.themeService.initTheme();
    
    // Hide loader after initial load
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}