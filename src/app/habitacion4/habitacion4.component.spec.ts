import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitacion4Component } from './habitacion4.component';

describe('Habitacion4Component', () => {
  let component: Habitacion4Component;
  let fixture: ComponentFixture<Habitacion4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitacion4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Habitacion4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
