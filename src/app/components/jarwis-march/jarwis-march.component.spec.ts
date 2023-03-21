import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarwisMarchComponent } from './jarwis-march.component';

describe('JarwisMarchComponent', () => {
  let component: JarwisMarchComponent;
  let fixture: ComponentFixture<JarwisMarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JarwisMarchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JarwisMarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
