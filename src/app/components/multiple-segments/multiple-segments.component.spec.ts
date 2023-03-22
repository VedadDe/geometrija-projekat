import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSegmentsComponent } from './multiple-segments.component';

describe('MultipleSegmentsComponent', () => {
  let component: MultipleSegmentsComponent;
  let fixture: ComponentFixture<MultipleSegmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSegmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
