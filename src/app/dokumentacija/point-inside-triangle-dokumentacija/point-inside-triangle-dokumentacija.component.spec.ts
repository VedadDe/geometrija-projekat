import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInsideTriangleDokumentacijaComponent } from './point-inside-triangle-dokumentacija.component';

describe('PointInsideTriangleDokumentacijaComponent', () => {
  let component: PointInsideTriangleDokumentacijaComponent;
  let fixture: ComponentFixture<PointInsideTriangleDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointInsideTriangleDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointInsideTriangleDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
