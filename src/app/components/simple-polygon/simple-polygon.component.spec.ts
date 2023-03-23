import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePolygonComponent } from './simple-polygon.component';

describe('SimplePolygonComponent', () => {
  let component: SimplePolygonComponent;
  let fixture: ComponentFixture<SimplePolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePolygonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
