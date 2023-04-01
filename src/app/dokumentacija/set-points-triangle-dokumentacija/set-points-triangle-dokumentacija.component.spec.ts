import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPointsTriangleDokumentacijaComponent } from './set-points-triangle-dokumentacija.component';

describe('SetPointsTriangleDokumentacijaComponent', () => {
  let component: SetPointsTriangleDokumentacijaComponent;
  let fixture: ComponentFixture<SetPointsTriangleDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPointsTriangleDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPointsTriangleDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
