import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPointsTriangleComponent } from './set-points-triangle.component';

describe('SetPointsTriangleComponent', () => {
  let component: SetPointsTriangleComponent;
  let fixture: ComponentFixture<SetPointsTriangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPointsTriangleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPointsTriangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
