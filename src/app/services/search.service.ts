import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'api.bing.microsoft.com/api/bing/v7.0/videos/search';

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    // Set up the request headers
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': 'temp',
    });

    // Set up the request parameters
    const params = new HttpParams().set('q', query);

    // Make the API request
    return this.http.get(this.apiUrl, { headers, params }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return error;
      })
    );
  }
}