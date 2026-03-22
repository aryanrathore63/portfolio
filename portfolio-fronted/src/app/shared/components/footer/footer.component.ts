import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  developer = environment.developer;
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'LinkedIn',
      url: this.developer.linkedin,
      icon: 'linkedin'
    },
    {
      name: 'GitHub',
      url: this.developer.github,
      icon: 'github'
    },
    {
      name: 'Email',
      url: `mailto:${this.developer.email}`,
      icon: 'mail'
    }
  ];
}