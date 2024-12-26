import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPdfViewerComponent } from './report-pdf-viewer.component';

describe('ReportPdfViewerComponent', () => {
  let component: ReportPdfViewerComponent;
  let fixture: ComponentFixture<ReportPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPdfViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
