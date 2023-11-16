import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://mentormolefunctions.azurewebsites.net/api/CallSearchAPI?';

  constructor(private http: HttpClient) {}

  search(query: string) {
    const url = `${this.apiUrl}?q=${query}`;
    return this.http.get(url);
  }
}