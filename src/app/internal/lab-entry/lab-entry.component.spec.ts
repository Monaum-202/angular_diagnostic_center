import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEntryComponent } from './lab-entry.component';

describe('LabEntryComponent', () => {
  let component: LabEntryComponent;
  let fixture: ComponentFixture<LabEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
