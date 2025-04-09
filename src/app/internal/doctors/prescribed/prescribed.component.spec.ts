import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribedComponent } from './prescribed.component';

describe('PrescribedComponent', () => {
  let component: PrescribedComponent;
  let fixture: ComponentFixture<PrescribedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescribedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
