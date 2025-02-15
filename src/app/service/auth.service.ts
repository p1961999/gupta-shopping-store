import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1'; // Replace with actual API URL
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  // Check if token exists in localStorage
  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, data);
  }

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response?.access_token);
        localStorage.setItem('refreshToken', response?.refresh_token)
        this.authState.next(true);
      })
    );
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {
      refreshToken: this.getRefreshToken()
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/profile`);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['/users/login']);
  }

  // Get authentication status as an Observable
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('auth_token');
      return !!token; // Returns true if a token is present
    }
    return false;
  }

  // Get token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  checkEmailExists(email: any): Observable<any> {
    const url = `${this.apiUrl}/users/is-available`;
    return this.http.post<any>(url, email).pipe(
      map(response => {
        return response;
      })
    );
  }
}
