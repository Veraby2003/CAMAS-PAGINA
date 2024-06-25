import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitacion2Component } from './habitacion2.component';

describe('Habitacion2Component', () => {
  let component: Habitacion2Component;
  let fixture: ComponentFixture<Habitacion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitacion2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Habitacion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
