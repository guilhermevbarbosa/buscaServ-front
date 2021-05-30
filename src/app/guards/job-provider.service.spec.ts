import { TestBed } from '@angular/core/testing';

import { JobProviderService } from './job-provider.service';

describe('JobProviderService', () => {
  let service: JobProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
