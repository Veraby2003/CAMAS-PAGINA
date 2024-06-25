import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteConPalabrasComponent } from './componente-con-palabras.component';

describe('ComponenteConPalabrasComponent', () => {
  let component: ComponenteConPalabrasComponent;
  let fixture: ComponentFixture<ComponenteConPalabrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteConPalabrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteConPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
