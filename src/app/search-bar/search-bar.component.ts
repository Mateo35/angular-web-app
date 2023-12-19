import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query = '';
  searchResults: any;

  constructor(private searchService: SearchService) { }

  onSearch() {
    //temporary
    console.log(this.query);
    this.searchService.search(this.query).subscribe(
      (data) => {
        this.searchResults = data;
        console.log('Search Bar Result:', JSON.stringify(this.searchResults, null, 2));
      },
      (error) => {
        console.error('Search Bar Error:', error);
      }
    );
  }
}
