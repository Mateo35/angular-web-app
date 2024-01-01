import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResourcesComponent } from '../resources/resources.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public onChangeSearchResult: EventEmitter<any> = new EventEmitter<any>();

  inputQuery = '';
  private searchResult: any;

  private isSearchOnCooldown = false;
  private cooldownTimeMS = 5000;

  public isLoading: boolean = false;

  private azureFuncURL = 'https://mentormolefunctions.azurewebsites.net/api/CallSearchAPI';

  constructor(private http: HttpClient, private router: Router) { }

  public onSearch() {
    if (this.inputQuery == '') return;
    if (this.isSearchOnCooldown) return

    //navigate if necessary
    if (this.router.url != '/resources') {
      this.router.navigate(['/resources']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.setSearchCooldown();
    this.isLoading = true;

    const searchQuery = this.processQuery(this.inputQuery);

    this.search(searchQuery)
      .then(searchResult => {
        this.isLoading = false;

        this.searchResult = searchResult;
        this.onChangeSearchResult.emit(this.searchResult);
      })
      .catch(error => {
        this.isLoading = false;
        console.error('An error occurred during the search:', error);
        throw new Error('An error occurred during the search.');
      });
  }

  private async search(searchQuery: string): Promise<any> {
    console.log("Beginning search for", searchQuery);

    const url = `${this.azureFuncURL}?q=${searchQuery}`;
    const headers = new HttpHeaders({ 'q': searchQuery });

    try {
      return await this.http.get(url, { headers }).toPromise();
    } catch (error) {
      console.error("An error occurred during the search.", error);
      throw new Error('An error occurred during the search.');
    }
  }

  private processQuery(queryInput: string): string {
    var processedQuery = queryInput;

    //other processing measures here
    processedQuery = processedQuery.concat(" \"course\" \"tutorial\" \"lesson\"")

    return processedQuery;
  }

  private setSearchCooldown() {
    this.isSearchOnCooldown = true;
    setTimeout(() => {
      this.isSearchOnCooldown = false;
    }, this.cooldownTimeMS); // cooldown time in milliseconds
  }
}