import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Project,
  Experience,
  SkillCategory,
  Skill,
  Achievement,
  ContactFormData,
  ContactResponse,
  PaginatedResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/category/${category}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getPaginatedProjects(page: number = 1, pageSize: number = 6): Observable<PaginatedResponse<Project>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Project>>(`${this.apiUrl}/projects/paginated`, { params }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Experience
  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getExperienceById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/experience/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Skills
  getSkillCategories(): Observable<SkillCategory[]> {
    return this.http.get<SkillCategory[]>(`${this.apiUrl}/skills`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills/all`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills/category/${category}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Achievements
  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.apiUrl}/achievements`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getAchievementById(id: number): Observable<Achievement> {
    return this.http.get<Achievement>(`${this.apiUrl}/achievements/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Contact
  submitContact(form: ContactFormData): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}/contact`, form).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      }
    }

    console.error('PortfolioService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}