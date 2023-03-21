import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInPolygonComponent } from './point-in-polygon.component';

describe('PointInPolygonComponent', () => {
  let component: PointInPolygonComponent;
  let fixture: ComponentFixture<PointInPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointInPolygonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointInPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
