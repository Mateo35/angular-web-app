// src/app/search-mediator.service.ts

import { Injectable } from '@angular/core';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class SearchMediatorService {
  constructor(private searchService: SearchService) {}

  initiateSearch(query: string) {
    return this.searchService.search(query);
  }
}
