import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-logout-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './logout-admin.component.html',
  styleUrls: ['./logout-admin.component.css']
})
export class LogoutAdminComponent {

  constructor(private router: Router, private authService: AuthService) {}

  confirmLogout(): void {
    this.authService.logout().subscribe(
      () => {
        // Clear local session or tokens
        localStorage.removeItem('token'); // Example: Remove authentication token from localStorage

        // Navigate to the login page after successful logout
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Failed to logout:', error);
        // Handle logout error
      }
    );
  }

  cancelLogout(): void {
    // Logic to handle canceling logout, e.g., redirect back to dashboard
    this.router.navigate(['/admin']); // Placeholder for actual cancel logic
  }
}
