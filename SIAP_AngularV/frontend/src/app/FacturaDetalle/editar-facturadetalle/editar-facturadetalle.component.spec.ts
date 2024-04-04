import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFacturadetalleComponent } from './editar-facturadetalle.component';

describe('EditarFacturadetalleComponent', () => {
  let component: EditarFacturadetalleComponent;
  let fixture: ComponentFixture<EditarFacturadetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFacturadetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFacturadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
