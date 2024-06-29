import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/logout'; // Adjust URL based on your backend API

  constructor(private http: HttpClient) {}

  logout(): Observable<any> {
    return this.http.post<any>(this.apiUrl, {}).pipe(
      catchError((error: any) => {
        console.error('Failed to logout:', error);
        throw new Error('Failed to logout');
      })
    );
  }
}
