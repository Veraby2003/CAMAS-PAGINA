import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitacion1Component } from './habitacion1.component';

describe('Habitacion1Component', () => {
  let component: Habitacion1Component;
  let fixture: ComponentFixture<Habitacion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitacion1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Habitacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
