import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  serviceCategory: string;
  brand: string;
  problem: string;
  preferredDate: string;
  timeSlot: string;
}

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  private http = inject(HttpClient);

  /**
   * IMPORTANT: Replace this URL with your own Google Apps Script Web App URL.
   * Steps:
   * 1. Open Google Sheets → Extensions → Apps Script
   * 2. Paste the code from google-apps-script.js
   * 3. Click Deploy → New Deployment → Web app
   * 4. Set "Execute as: Me" and "Who has access: Anyone"
   * 5. Copy the Web App URL and paste it below
   */
  private readonly APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxx_-9iz9IU6ZdBhV-B6Lz0WaZ0KGruJyFdXAWS9uvGRWSewvQzbqA21Gdqc2wX7f48lA/exec';

  submitBooking(data: BookingData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http
      .post(this.APPS_SCRIPT_URL, JSON.stringify(data), {
        headers,
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error('Sheets API Error:', error);
          return throwError(() => new Error('Failed to submit booking. Please try again.'));
        })
      );
  }
}
