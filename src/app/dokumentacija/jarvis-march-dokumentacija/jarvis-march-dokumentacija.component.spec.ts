import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarvisMarchDokumentacijaComponent } from './jarvis-march-dokumentacija.component';

describe('JarvisMarchDokumentacijaComponent', () => {
  let component: JarvisMarchDokumentacijaComponent;
  let fixture: ComponentFixture<JarvisMarchDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JarvisMarchDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JarvisMarchDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
