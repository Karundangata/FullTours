import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  tours: any[] = [];
  hotels: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchTours();
    this.fetchHotels();
  }

  fetchTours(): void {        
    this.dataService.getTours().subscribe(
      (tours: any[]) => {
        this.tours = tours;
      },
      (error: any) => {
        console.error('Failed to fetch tours:', error);
      }
    );
  }

  fetchHotels(): void {
    this.dataService.getHotels().subscribe(
      (hotels: any[]) => {
        this.hotels = hotels;
      },
      (error: any) => {
        console.error('Failed to fetch hotels:', error);
      }
    );
  }

  bookTour(tourId: number): void {
    this.dataService.bookTour(tourId).subscribe(
      () => {
        alert('Tour booked successfully');
        this.fetchTours();
      },
      (error: any) => {
        console.error('Failed to book tour:', error);
      }
    );
  }

  bookHotel(hotelId: number): void {
    this.dataService.bookHotel(hotelId).subscribe(
      () => {
        alert('Hotel booked successfully');
        this.fetchHotels();
      },
      (error: any) => {
        console.error('Failed to book hotel:', error);
      }
    );
  }
}



