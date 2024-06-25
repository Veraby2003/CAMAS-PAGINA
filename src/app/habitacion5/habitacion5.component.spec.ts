import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitacion5Component } from './habitacion5.component';

describe('Habitacion5Component', () => {
  let component: Habitacion5Component;
  let fixture: ComponentFixture<Habitacion5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitacion5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Habitacion5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
