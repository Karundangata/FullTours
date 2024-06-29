// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from './booking.model'; 

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:3000/bookings'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // HTTP Options for headers
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Booking[]>('getBookings', []))
      );
  }

  // Add a booking
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking, this.httpOptions)
      .pipe(
        catchError(this.handleError<Booking>('addBooking'))
      );
  }

  // Update a booking
  updateBooking(booking: Booking): Observable<any> {
    const url = `${this.apiUrl}/${booking.id}`;
    return this.http.put(url, booking, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateBooking'))
      );
  }

  // Delete a booking
  deleteBooking(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteBooking'))
      );
  }
}
