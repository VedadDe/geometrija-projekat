import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvexCheckDokumentacijaComponent } from './convex-check-dokumentacija.component';

describe('ConvexCheckDokumentacijaComponent', () => {
  let component: ConvexCheckDokumentacijaComponent;
  let fixture: ComponentFixture<ConvexCheckDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvexCheckDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvexCheckDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
