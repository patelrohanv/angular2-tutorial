import { TestBed, inject } from '@angular/core/testing';

import { LeadershipService } from './leadership.service';

describe('LeadershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeadershipService]
    });
  });

  it('should be created', inject([LeadershipService], (service: LeadershipService) => {
    expect(service).toBeTruthy();
  }));
});
