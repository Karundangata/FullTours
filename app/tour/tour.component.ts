import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {


  tours = [
    { name: 'Tour 1' },
    { name: 'Tour 2' },
    // Add more tours here
  ];

  constructor(private router: Router, private http: HttpClient) {}

  addToBooking(tour: any) {
    // Logic to add tour to booking
    console.log('Tour added to booking:', tour);

    // Send a POST request to add the tour to the backend server
    this.http.post<any>('http://localhost:3000/tours', tour).subscribe(
      (response) => {
        console.log('Tour added successfully:', response);
        this.router.navigate(['/booking']); // Navigate to booking page after adding tour
      },
      (error) => {
        console.error('Error adding tour:', error);
        // Handle error appropriately (e.g., display error message to user)
      }
    );
  }
}
