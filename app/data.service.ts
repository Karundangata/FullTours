import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tours`).pipe(
      catchError(error => {
        console.error('Error fetching tours:', error);
        return throwError('Something went wrong fetching tours.');
      })
    );
  }

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels`).pipe(
      catchError(error => {
        console.error('Error fetching hotels:', error);
        return throwError('Something went wrong fetching hotels.');
      })
    );
  }

  bookTour(tourId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book-tour`, { tourId }).pipe(
      catchError(error => {
        console.error('Error booking tour:', error);
        return throwError('Something went wrong booking tour.');
      })
    );
  }

  bookHotel(hotelId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book-hotel`, { hotelId }).pipe(
      catchError(error => {
        console.error('Error booking hotel:', error);
        return throwError('Something went wrong booking hotel.');
      })
    );
  }
}
