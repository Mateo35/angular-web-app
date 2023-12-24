import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  inputQuery = '';
  searchResult: any;

  private isSearchOnCooldown = false;
  cooldownTimeMS = 5000;

  isLoading: boolean = false;

  private azureFuncURL = 'https://mentormolefunctions.azurewebsites.net/api/CallSearchAPI';

  constructor(private http: HttpClient, private router: Router) { }

  public onSearch() {
    if (this.inputQuery == '') return;
    if (this.isSearchOnCooldown) return

    this.setSearchCooldown();
    this.isLoading = true;

    const searchQuery = this.processQuery(this.inputQuery);

    this.search(searchQuery)
      .then(searchResult => {
        //complete
        this.searchResult = searchResult;
        this.isLoading = false;

        if (this.router.url != '/resources')
          this.router.navigate(['/resources']);
      })
      .catch(error => {
        //error
        console.error('An error occurred during the search:', error);
        this.isLoading = false;
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

    return processedQuery;
  }

  private setSearchCooldown() {
    this.isSearchOnCooldown = true;
    setTimeout(() => {
      this.isSearchOnCooldown = false;
    }, this.cooldownTimeMS); // Time
  }
}