import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCheckupComponent } from './h-checkup.component';

describe('HCheckupComponent', () => {
  let component: HCheckupComponent;
  let fixture: ComponentFixture<HCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCheckupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
