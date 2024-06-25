import { TestBed } from '@angular/core/testing';

import { Hab1Service} from './hab1.service';

describe('Hab2Service', () => {
  let service: Hab1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hab1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
