import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { emailRegex } from '../../../utils/regex.utils';
import { lastValueFrom } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailRegex]],
      password: ['', [Validators.required]]
    });
  }

  closePopUp(){
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        // Step 1: Perform Login and get the token
        const loginResponse = await lastValueFrom(this.authService.login(this.loginForm.value));
        const userProfile = await lastValueFrom(this.authService.getUserProfile());
        localStorage.setItem('user', JSON.stringify(userProfile));
        if(this.data?.fromCart){
          this.dialogRef.close();
          this.router.navigate(['/checkout']);
        }
        else{
        this.router.navigate(['/home']);
        }

      } catch (error: any) {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = error.error?.message || 'Login failed';
        }
        console.error('Error during login:', error);
      }
    }
  }

  redirectToSignUp() {
    this.router.navigate(['/users/signup']);
  }

  redirectToForgotPassword(){
    this.router.navigate(['/users/forgot-password']);
  }
}
