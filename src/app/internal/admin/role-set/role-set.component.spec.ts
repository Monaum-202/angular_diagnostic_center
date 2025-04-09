import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSetComponent } from './role-set.component';

describe('RoleSetComponent', () => {
  let component: RoleSetComponent;
  let fixture: ComponentFixture<RoleSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
