import { TestBed } from '@angular/core/testing';

import { Hab4Service } from './hab4.service';

describe('Hab4Service', () => {
  let service: Hab4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hab4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
