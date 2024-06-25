import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitacion3Component } from './habitacion3.component';

describe('Habitacion3Component', () => {
  let component: Habitacion3Component;
  let fixture: ComponentFixture<Habitacion3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitacion3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Habitacion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
