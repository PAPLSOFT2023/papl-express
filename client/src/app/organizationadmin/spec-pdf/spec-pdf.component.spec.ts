import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecPdfComponent } from './spec-pdf.component';

describe('SpecPdfComponent', () => {
  let component: SpecPdfComponent;
  let fixture: ComponentFixture<SpecPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
