import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfPdfComponent } from './inf-pdf.component';

describe('InfPdfComponent', () => {
  let component: InfPdfComponent;
  let fixture: ComponentFixture<InfPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
