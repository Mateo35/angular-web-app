import { TestBed } from '@angular/core/testing';

import { SearchMediatorService } from './search-mediator.service';

describe('SearchMediatorService', () => {
  let service: SearchMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
