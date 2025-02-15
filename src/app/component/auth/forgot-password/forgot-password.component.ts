import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  step: number = 1; // Step 1: Email, Step 2: Reset Password
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  email: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPasswords });
  }

  // Validate password match
  private matchPasswords(group: FormGroup) {
    return group.get('newPassword')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Step 1: Check if Email Exists
  async verifyEmail() {
    if (this.forgotPasswordForm.valid) {
      try {
        const response = await lastValueFrom(this.authService.checkEmailExists(this.forgotPasswordForm.value.email));

        if (response.isAvailable === false) {
          this.email = this.forgotPasswordForm.value.email;
          this.step = 2; // Proceed to password reset step
        } else {
          this.errorMessage = 'Email not found. Please try again.';
        }
      } catch (error) {
        this.errorMessage = 'Something went wrong. Try again later.';
      }
    }
  }

  // Step 2: Reset Password
  // async resetPassword() {
  //   if (this.resetPasswordForm.valid) {
  //     try {
  //       await lastValueFrom(this.authService.resetPassword({
  //         email: this.email,
  //         newPassword: this.resetPasswordForm.value.newPassword
  //       }));
  //       this.router.navigate(['/login']); // Redirect to login
  //     } catch (error) {
  //       this.errorMessage = 'Failed to reset password. Try again later.';
  //     }
  //   }
  // }
}
