import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDocumentatrionDokumentacijaComponent } from './points-documentatrion-dokumentacija.component';

describe('PointsDocumentatrionDokumentacijaComponent', () => {
  let component: PointsDocumentatrionDokumentacijaComponent;
  let fixture: ComponentFixture<PointsDocumentatrionDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsDocumentatrionDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsDocumentatrionDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
