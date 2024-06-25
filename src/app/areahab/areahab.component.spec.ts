import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteConRectangulosComponent } from './areahab.component';

describe('ComponenteConRectangulosComponent', () => {
  let component: ComponenteConRectangulosComponent;
  let fixture: ComponentFixture<ComponenteConRectangulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteConRectangulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteConRectangulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
