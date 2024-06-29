import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../auth.services';
import { HotelService } from '../../hotel.service';
import { TourService } from '../tour.service';
import { UserService } from '../userService';
import { User } from '../../user.model';
import { Tour } from '../../tour.model';
import { Hotel } from '../../Models/HotelModel';
import { Booking } from '../../booking.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  users: User[] = [];
  tours: Tour[] = [];
  hotels: Hotel[] = [];
  bookings: Booking[] = [];
  currentBooking: Booking = {
    id: 0,
    userId: '',
    tourId: '',
    hotelId: '',
    bookingDate: ''
  };

  constructor(
    private bookingService: BookingService,
    private hotelService: HotelService,
    private tourService: TourService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => this.users = users,
      (error: any) => console.error('Failed to fetch users:', error)
    );

    this.tourService.getTours().subscribe(
      (tours: Tour[]) => this.tours = tours,
      (error: any) => console.error('Failed to fetch tours:', error)
    );

    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => this.hotels = hotels,
      (error: any) => console.error('Failed to fetch hotels:', error)
    );

    this.bookingService.getBookings().subscribe(
      (bookings: Booking[]) => this.bookings = bookings,
      (error: any) => console.error('Failed to fetch bookings:', error)
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.currentBooking.id === 0) {
      this.addBooking();
    } else {
      this.updateBooking();
    }
  }

  onCancel(): void {
    this.resetCurrentBooking();
  }

  addBooking(): void {
    this.bookingService.addBooking(this.currentBooking).subscribe(
      (newBooking: Booking) => {
        alert('Booking added successfully');
        this.resetCurrentBooking();
        this.loadBookings();
      },
      (error: any) => console.error('Failed to add booking:', error)
    );
  }

  updateBooking(): void {
    this.bookingService.updateBooking(this.currentBooking).subscribe(
      () => {
        alert('Booking updated successfully');
        this.resetCurrentBooking();
        this.loadBookings();
      },
      (error: any) => console.error('Failed to update booking:', error)
    );
  }

  deleteBooking(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        alert('Booking deleted successfully');
        this.loadBookings();
      },
      (error: any) => console.error('Failed to delete booking:', error)
    );
  }

  editBooking(booking: Booking): void {
    this.currentBooking = { ...booking };
  }

  resetCurrentBooking(): void {
    this.currentBooking = {
      id: 0,
      userId: '',
      tourId: '',
      hotelId: '',
      bookingDate: ''
    };
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      (bookings: Booking[]) => this.bookings = bookings,
      (error: any) => console.error('Failed to fetch bookings:', error)
    );
  }
}
