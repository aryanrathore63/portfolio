import { Routes } from '@angular/router';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HeroComponent,
    title: 'Home | Aryan Rathore'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About | Aryan Rathore'
  },
  {
    path: 'skills',
    component: SkillsComponent,
    title: 'Skills | Aryan Rathore'
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    title: 'Experience | Aryan Rathore'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projects | Aryan Rathore'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact | Aryan Rathore'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];