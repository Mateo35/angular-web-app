import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {
  inputQueryDisplay = '';

  constructor(public searchService: SearchService) { 
    this.inputQueryDisplay = this.searchService.inputQuery;
  }
}
