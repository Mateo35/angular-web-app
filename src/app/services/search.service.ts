import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://mentormolefunctions.azurewebsites.net/api/CallSearchAPI';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}`;
    const headers = new HttpHeaders({
      'q': query
    });

    return this.http.get(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error during search request:', error);
        return throwError(() => new Error('An error occurred during the search.'));
      })
    );
  }
}
