import { TestBed } from '@angular/core/testing';

import { ShownotificationService } from './shownotification.service';

describe('ShownotificationService', () => {
  let service: ShownotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShownotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
