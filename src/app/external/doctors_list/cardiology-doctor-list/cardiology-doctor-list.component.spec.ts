import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardiologyDoctorListComponent } from './cardiology-doctor-list.component';

describe('CardiologyDoctorListComponent', () => {
  let component: CardiologyDoctorListComponent;
  let fixture: ComponentFixture<CardiologyDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardiologyDoctorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardiologyDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
