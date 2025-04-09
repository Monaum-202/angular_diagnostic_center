import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediDepartmentComponent } from './medi-department.component';

describe('MediDepartmentComponent', () => {
  let component: MediDepartmentComponent;
  let fixture: ComponentFixture<MediDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
