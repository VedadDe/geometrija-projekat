import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLinesIntersectionsComponent } from './two-lines-intersections.component';

describe('TwoLinesIntersectionsComponent', () => {
  let component: TwoLinesIntersectionsComponent;
  let fixture: ComponentFixture<TwoLinesIntersectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLinesIntersectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoLinesIntersectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
