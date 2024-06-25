import { TestBed } from '@angular/core/testing';

import { Hab2Service } from './hab2.service';

describe('Hab2Service', () => {
  let service: Hab2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hab2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
