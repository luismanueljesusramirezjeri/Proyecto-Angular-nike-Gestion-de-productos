import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGestionComponent } from './inicio-gestion.component';

describe('InicioGestionComponent', () => {
  let component: InicioGestionComponent;
  let fixture: ComponentFixture<InicioGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
