import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  loginForm: FormGroup;
  private intervalId: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      Password: ['', Validators.required],
      grant_type: ['password'],
      mobileid: ['9cb2fcb2de1c71e8'],
    });
  }

  onSubmit() {
    this.isLoading = true;
    const { username, Password, grant_type, mobileid } = this.loginForm.value;
    this.authService.login(username, Password, grant_type, mobileid).subscribe({
      next: (res) => {
        if (res.access_token !== null) {
          this.isLoading = false;
          this.loginForm.reset();
        }
        localStorage.setItem('Token', res.access_token);
        this.authService.tokenKey = res.access_token;
        this.toastrService.success('Login Successful', 'Welcome Back', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.intervalId = setInterval(() => {
          this.router.navigate(['/seafarers']);
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login Error:', err);
        this.isLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
