import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDoctorListComponent } from './online-doctor-list.component';

describe('OnlineDoctorListComponent', () => {
  let component: OnlineDoctorListComponent;
  let fixture: ComponentFixture<OnlineDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineDoctorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
