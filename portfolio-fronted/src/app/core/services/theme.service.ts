import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode$ = new BehaviorSubject<boolean>(true);
  private readonly THEME_KEY = 'portfolio-theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  constructor() {
    this.loadTheme();
  }

  get isDarkMode() {
    return this.isDarkMode$.asObservable();
  }

  get currentTheme(): Theme {
    return this.isDarkMode$.value ? this.DARK_THEME : this.LIGHT_THEME;
  }

  initTheme(): void {
    this.loadTheme();
    this.listenForSystemThemeChanges();
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode$.value;
    this.isDarkMode$.next(newMode);
    this.applyTheme(newMode);
    this.saveTheme(newMode);
  }

  setTheme(theme: Theme): void {
    const isDark = theme === this.DARK_THEME;
    this.isDarkMode$.next(isDark);
    this.applyTheme(isDark);
    this.saveTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    const theme = isDark ? this.DARK_THEME : this.LIGHT_THEME;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties
    if (isDark) {
      this.setDarkThemeVariables();
    } else {
      this.setLightThemeVariables();
    }
  }

  private setDarkThemeVariables(): void {
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', '#0a0a1a');
    root.style.setProperty('--bg-secondary', '#12122a');
    root.style.setProperty('--bg-tertiary', '#1a1a3a');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-secondary', '#b0b0d0');
    root.style.setProperty('--text-muted', '#8080a0');
    root.style.setProperty('--accent-primary', '#00d4ff');
    root.style.setProperty('--accent-secondary', '#7c3aed');
    root.style.setProperty('--accent-glow', 'rgba(0, 212, 255, 0.3)');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--glass-bg', 'rgba(10, 10, 26, 0.7)');
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
  }

  private setLightThemeVariables(): void {
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', '#f5f5f7');
    root.style.setProperty('--bg-secondary', '#ffffff');
    root.style.setProperty('--bg-tertiary', '#e8e8ed');
    root.style.setProperty('--text-primary', '#1d1d1f');
    root.style.setProperty('--text-secondary', '#424245');
    root.style.setProperty('--text-muted', '#6e6e73');
    root.style.setProperty('--accent-primary', '#0066cc');
    root.style.setProperty('--accent-secondary', '#7c3aed');
    root.style.setProperty('--accent-glow', 'rgba(0, 102, 204, 0.2)');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.8)');
    root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark ? this.DARK_THEME : this.LIGHT_THEME);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme 
      ? savedTheme === this.DARK_THEME 
      : prefersDark;
    
    this.isDarkMode$.next(isDark);
    this.applyTheme(isDark);
  }

  // Listen for system theme changes
  listenForSystemThemeChanges(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.isDarkMode$.next(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }
}