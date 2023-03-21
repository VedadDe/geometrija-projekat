import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIfQuadrilateralIsConvexComponent } from './check-if-quadrilateral-is-convex.component';

describe('CheckIfQuadrilateralIsConvexComponent', () => {
  let component: CheckIfQuadrilateralIsConvexComponent;
  let fixture: ComponentFixture<CheckIfQuadrilateralIsConvexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIfQuadrilateralIsConvexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIfQuadrilateralIsConvexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
