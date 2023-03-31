import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoLinesIntersectionsDokumentacijaComponent } from './two-lines-intersections-dokumentacija.component';

describe('TwoLinesIntersectionsDokumentacijaComponent', () => {
  let component: TwoLinesIntersectionsDokumentacijaComponent;
  let fixture: ComponentFixture<TwoLinesIntersectionsDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoLinesIntersectionsDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoLinesIntersectionsDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
