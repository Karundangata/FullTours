import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private baseUrl = 'http://localhost:3000/tours'; // Assuming json-server runs on port 3000

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseUrl);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.baseUrl, tour);
  }

  updateTour(tour: Tour): Observable<any> {
    const url = `${this.baseUrl}/${tour.id}`;
    return this.http.put(url, tour);
  }

  deleteTour(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
