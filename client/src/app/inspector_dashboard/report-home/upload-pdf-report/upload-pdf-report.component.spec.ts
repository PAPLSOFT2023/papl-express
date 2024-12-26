import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPdfReportComponent } from './upload-pdf-report.component';

describe('UploadPdfReportComponent', () => {
  let component: UploadPdfReportComponent;
  let fixture: ComponentFixture<UploadPdfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPdfReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPdfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
