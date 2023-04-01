import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSegmentsDokumentacijaComponent } from './multiple-segments-dokumentacija.component';

describe('MultipleSegmentsDokumentacijaComponent', () => {
  let component: MultipleSegmentsDokumentacijaComponent;
  let fixture: ComponentFixture<MultipleSegmentsDokumentacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSegmentsDokumentacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSegmentsDokumentacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
