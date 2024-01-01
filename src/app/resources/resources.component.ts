import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ItemData } from '../interfaces/item.interface';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {

  currentSearchResult: any;
  itemList: ItemData[];

  searchSummaryText = 'Waiting for input';

  totalItems = 0;
  itemsPerPage = 35;

  // 

  private maxTitleLength = 58;
  private maxCreatorLength = 28;

  constructor(public searchService: SearchService) { }

  public onChangeSearchResultEvent() {
    this.createItemList();
    this.updateSearchSummary();
    this.updateLocalStorage();
  }

  private createItemList() {
    this.itemList = [];
    const responseItems = this.currentSearchResult.response.value;

    for (var i = 0; i < responseItems.length; i++) {
      const currItem: ItemData = {
        index: 0,
        url: '',
        thumbnailUrl: '',
        title: '',
        publisher: '',
        creator: '',
        viewCount: '',
        date: ''
      };

      //access data from the bing web search API in Microsoft's format
      currItem.index = i;
      currItem.url = responseItems[i].contentUrl;
      currItem.thumbnailUrl = responseItems[i].thumbnailUrl;
      currItem.title = responseItems[i].name;
      currItem.publisher = responseItems[i].publisher[0].name;
      if(responseItems[i].creator) currItem.creator = responseItems[i].creator.name;
      if(responseItems[i].viewCount) currItem.viewCount = this.formatNumber(responseItems[i].viewCount);
      currItem.date = this.formatDate(responseItems[i].datePublished);

      if (currItem.title.length >= this.maxTitleLength)
        currItem.title = currItem.title.substring(0, this.maxTitleLength) + "...";

      if (currItem.creator.length >= this.maxCreatorLength)
        currItem.creator = currItem.creator.substring(0, this.maxCreatorLength) + "...";

      this.itemList.push(currItem);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem("itemList", JSON.stringify(this.itemList));
    localStorage.setItem("searchSummary", JSON.stringify(this.searchSummaryText));
  }

  private updateSearchSummary() {
    this.totalItems = this.currentSearchResult.response.value.length;
    this.searchSummaryText = `Showing results for "${this.currentSearchResult.query}" - ${this.itemsPerPage} in ${this.totalItems}`;
  }

  private tryGetLocalStorage() {
    var localItemList = localStorage.getItem("itemList");
    var localSearchSummaryText = localStorage.getItem("searchSummary");

    if (localItemList && localSearchSummaryText) {
      this.itemList = JSON.parse(localItemList);
      this.searchSummaryText = JSON.parse(localSearchSummaryText);
    }
  }

  SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
  private formatNumber(num: number): string {
    var tier = Math.log10(Math.abs(num)) / 3 | 0;

    if (tier == 0) return `${num}`;

    var suffix = this.SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    var scaled = num / scale;

    return scaled.toFixed(1) + suffix;
  }

  MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${this.MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  //

  ngOnInit(): void {
    this.searchService.onChangeSearchResult.subscribe((newSearchResult) => {
      this.currentSearchResult = newSearchResult;
      this.onChangeSearchResultEvent();
    });

    this.tryGetLocalStorage();
  }

  ngOnDestroy(): void {
    this.searchService.onChangeSearchResult.unsubscribe();
  }
}
