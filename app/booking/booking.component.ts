import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../../booking.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/bookings'; // Replace with your backend API URL
  bookings: Booking[] = [];
  newBooking: Booking = {
    type: 'tour', name: '', date: '', imageUrl: '',
    id: 0
  }; // Assign a default value for type

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBookings().subscribe(bookings => this.bookings = bookings);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl).pipe(
      catchError(this.handleError<Booking[]>('getBookings', []))
    );
  }

  addBooking(): void {
    if (!this.newBooking.type || !this.newBooking.name || !this.newBooking.date) {
      console.log('Please fill all required fields.');
      return;
    }

    // Send new booking data to backend API
    this.http.post<Booking>(`${this.apiUrl}/add`, this.newBooking, this.httpOptions).subscribe(
      booking => {
        this.bookings.push(booking);
        this.newBooking = { type: 'tour', name: '', date: '', imageUrl: '' }; // Reset newBooking after adding
      },
      error => {
        console.error('Error adding booking:', error);
      }
    );
  }

  deleteBooking(id: number): void {
    const url = `${this.apiUrl}/delete/${id}`;
    this.http.delete(url, this.httpOptions).subscribe(
      () => {
        this.bookings = this.bookings.filter(b => b.id !== id);
      },
      error => {
        console.error('Error deleting booking:', error);
      }
    );
  }

  updateBooking(booking: Booking): void {
    const url = `${this.apiUrl}/update/${booking.id}`;
    this.http.put(url, booking, this.httpOptions).subscribe(
      () => {
        console.log('Booking updated successfully.');
      },
      error => {
        console.error('Error updating booking:', error);
      }
    );
  }

  cancelBooking(id: number): void {
    // Placeholder for canceling booking action
    console.log(`Cancel booking with ID ${id}`);
    // Implement actual cancellation logic here
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
