import { TestBed } from '@angular/core/testing';

import { Hab3Service } from './hab3.service';

describe('Hab3Service', () => {
  let service: Hab3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hab3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
