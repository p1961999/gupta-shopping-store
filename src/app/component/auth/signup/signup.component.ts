import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordRegex } from '../../../utils/regex.utils';
import { UsersEmailValidatorService } from '../users-email-validator.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string = '';
  hideCurrentPassword: boolean = true;
  avatarPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private emailValidatorService: UsersEmailValidatorService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordRegex]],
      avatar: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.signupForm.patchValue({ avatar: file.name });
      this.signupForm.get('avatar')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleCurrentPasswordVisibility() {
    this.hideCurrentPassword = !this.hideCurrentPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: () =>this.navigateToLogin(),
        error: (err: any) => (this.errorMessage = err.error.message || 'Signup failed')
      });
    }
  }

  navigateToLogin(){
    this.router.navigate(['/users/login'])
  }

  validateEmailOnBlur(): void {
    const emailControl = this.signupForm.get('email');

    if (emailControl) {
      const emailValue = emailControl.value;

      if (!emailValue) {
        emailControl.setErrors({ required: true });
        return;
      }

      if (emailControl.errors) {
        emailControl.setErrors({ email: true });
        return;
      }

      this.emailValidatorService.validateEmail(emailControl).subscribe({
        next: (validationErrors) => {
          emailControl.setErrors(validationErrors || null);
        },
        error: (error) => {
          console.error('Email validation failed', error);
          emailControl.setErrors({ emailExists: true });
        },
      });
    }

  }
}
