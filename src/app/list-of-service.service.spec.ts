import { TestBed } from '@angular/core/testing';

import { ListOfServiceService } from './modules/setup/plans/service/list-of-service.service';

describe('ListOfServiceService', () => {
  let service: ListOfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
