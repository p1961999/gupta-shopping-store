import { Injectable } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersEmailValidatorService {
  constructor(private authService: AuthService) { }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const value ={email:  control.value};

    if (!value) {
      return of(null);
    }

    return this.authService.checkEmailExists(value).pipe(
      map((response: any) => {
        return !response.isAvailable ? { emailExists: true } : null;
      }),
      catchError(error => {
        console.error('Validation Error:', error);
        return of({ emailExists: true });
      })
    );
  }
}
