import { Component } from '@angular/core';
import { SearchMediatorService } from '../services/search-mediator.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  query: string = '';

  constructor(private searchMediatorService: SearchMediatorService) { }

  performSearch(): void {
    if (this.query.trim() !== '') {
      this.searchMediatorService.initiateSearch(this.query).subscribe(response => {
      });
    }
  }
}
