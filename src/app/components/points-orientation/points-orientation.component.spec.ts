import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOrientationComponent } from './points-orientation.component';

describe('PointsOrientationComponent', () => {
  let component: PointsOrientationComponent;
  let fixture: ComponentFixture<PointsOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsOrientationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
