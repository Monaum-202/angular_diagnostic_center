import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionPadComponent } from './prescription-pad.component';

describe('PrescriptionPadComponent', () => {
  let component: PrescriptionPadComponent;
  let fixture: ComponentFixture<PrescriptionPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionPadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
