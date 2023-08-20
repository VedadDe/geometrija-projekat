import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPossibleTiangulationsComponent } from './all-possible-tiangulations.component';

describe('AllPossibleTiangulationsComponent', () => {
  let component: AllPossibleTiangulationsComponent;
  let fixture: ComponentFixture<AllPossibleTiangulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPossibleTiangulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPossibleTiangulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
