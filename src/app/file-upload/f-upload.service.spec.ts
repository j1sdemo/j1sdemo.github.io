import { TestBed } from '@angular/core/testing';

import { FUploadService } from './f-upload.service';

describe('FUploadService', () => {
  let service: FUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
