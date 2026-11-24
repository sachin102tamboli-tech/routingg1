import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  mode: 'login' | 'signup' = 'login';
  loading = false;
  message = '';
  submitted = false;

  authForm = this.fb.group({
    name: [''],
    userRole: ['buyer', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  get fields() { return this.authForm.controls; }

  setMode(mode: 'login' | 'signup'): void {
    this.mode = mode;
    this.message = '';
    this.submitted = false;
    this.authForm.reset({ name: '', userRole: 'buyer', email: '', password: '' });
    this.fields.name.setValidators(mode === 'signup' ? [Validators.required] : []);
    this.fields.name.updateValueAndValidity();
  }

  submit(): void {
    this.submitted = true;
    this.message = '';
    if (this.authForm.invalid || this.loading) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { name, userRole, email, password } = this.authForm.getRawValue();
    const request = this.mode === 'login'
      ? this.auth.login({ email, password })
      : this.auth.signUp({ name, email, password, userRole });

    this.loading = true;
    request.pipe(finalize(() => this.loading = false)).subscribe({
      next: (result: any) => {
        if (this.mode === 'signup') {
          this.message = result?.message || 'Your account is ready. You can sign in now.';
          this.setMode('login');
          this.message = result?.message || 'Your account is ready. You can sign in now.';
          return;
        }
        if (result?.token) this.auth.saveToken(result.token);
        if (result?.userRole) this.auth.saveUserRole(result.userRole);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.message = error?.error?.message || 'We couldn’t complete that request. Please try again.';
      }
    });
  }
}
