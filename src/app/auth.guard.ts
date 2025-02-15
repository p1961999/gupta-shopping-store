import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
      return of(false); // Return an observable of false
    }

    return of(true);
  }
}
