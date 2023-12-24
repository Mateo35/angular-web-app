import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  searchSummaryText = 'Waiting for input';

  totalItems = 0;
  itemsPerPage = 6;

  constructor(public searchService: SearchService) { }

  public onChangeSearchResultEvent(newSearchResult: any)
  {
    this.totalItems = newSearchResult.response.value.length;
    this.searchSummaryText = `Showing results for "${newSearchResult.query}" - ${this.itemsPerPage} in ${this.totalItems}`;
  }

  //

  ngOnInit(): void {
    this.searchService.onChangeSearchResult.subscribe((newSearchResult) => {
      this.onChangeSearchResultEvent(newSearchResult);
    });
  }

  ngOnDestroy(): void {
    this.searchService.onChangeSearchResult.unsubscribe();
  }
}
