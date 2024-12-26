import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPdfComponent } from './feedback-pdf.component';

describe('FeedbackPdfComponent', () => {
  let component: FeedbackPdfComponent;
  let fixture: ComponentFixture<FeedbackPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
