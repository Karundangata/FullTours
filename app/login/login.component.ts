import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    // Check if the user is trying to log in as admin
    if (this.username === 'admin@admin.com' && this.password === '123456') {
      // Perform login for admin
      this.http.post<any>('http://your-backend-api-url/login', { username: this.username, password: this.password })
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            // Navigate to admin dashboard or specific admin page on successful login
            this.router.navigate(['/admin']);
          },
          (error) => {
            console.error('Login failed:', error);
            this.errorMessage = 'Invalid username or password. Please try again.';
          }
        );
    } else {
      // Non-admin login attempt
      this.errorMessage = 'Only admin can login with this account.';
    }
  }
}
