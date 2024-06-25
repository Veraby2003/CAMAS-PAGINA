import { TestBed } from '@angular/core/testing';
import { CamaStateService } from './cama-state.service';


describe('CamaStateService', () => {
  let service: CamaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
