import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAppointmentComponent } from './c-appointment.component';

describe('CAppointmentComponent', () => {
  let component: CAppointmentComponent;
  let fixture: ComponentFixture<CAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
