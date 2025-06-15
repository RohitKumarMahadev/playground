import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable, of } from 'rxjs'; // Import Observable and 'of' for placeholder
import { catchError, tap } from 'rxjs/operators'; // Import error handling and tap operators

@Injectable({
  providedIn: 'root'
})
export class DealDataService {

  // Placeholder API endpoints - replace with actual backend URLs
  private dmrDealsUrl = '/api/dmr'; // Example endpoint for DMR deals
  private newDealsUrl = '/api/new'; // Example endpoint for New Deals

  constructor(private http: HttpClient) { } // Inject HttpClient

  /** GET DMR deals from the server */
  getDmrDeals(): Observable<any[]> {
    console.log('DealDataService: fetching DMR deals from', this.dmrDealsUrl);
    return this.http.get<any[]>(this.dmrDealsUrl)
      .pipe(
        tap(data => console.log('DealDataService: fetched DMR deals', data)),
        catchError(this.handleError<any[]>('getDmrDeals', [])) // Basic error handling
      );
  }

  /** GET New Deals from the server */
  getNewDeals(): Observable<any[]> {
    console.log('DealDataService: fetching New Deals from', this.newDealsUrl);
    return this.http.get<any[]>(this.newDealsUrl)
      .pipe(
        tap(data => console.log('DealDataService: fetched New Deals', data)),
        catchError(this.handleError<any[]>('getNewDeals', [])) // Basic error handling
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`DealDataService: ${operation} failed`, error);
      // Let the app keep running by returning an empty result or a default.
      return of(result as T);
    };
  }
}
