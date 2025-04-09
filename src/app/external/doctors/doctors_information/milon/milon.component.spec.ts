import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilonComponent } from './milon.component';

describe('MilonComponent', () => {
  let component: MilonComponent;
  let fixture: ComponentFixture<MilonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
