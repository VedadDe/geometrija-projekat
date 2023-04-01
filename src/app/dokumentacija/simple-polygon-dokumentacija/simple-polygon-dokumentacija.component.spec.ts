import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePolygonDokumentacijaComponent } from './simple-polygon-dokumentacija.component';

describe('SimplePolygonDokumentacijaComponent', () => {
  let component: SimplePolygonDokumentacijaComponent;
  let fixture: ComponentFixture<SimplePolygonDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePolygonDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePolygonDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
