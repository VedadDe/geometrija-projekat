import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentPolygonComponent } from './segment-polygon.component';

describe('SegmentPolygonComponent', () => {
  let component: SegmentPolygonComponent;
  let fixture: ComponentFixture<SegmentPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentPolygonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
