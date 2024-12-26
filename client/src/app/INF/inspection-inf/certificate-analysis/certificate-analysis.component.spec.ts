import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateAnalysisComponent } from './certificate-analysis.component';

describe('CertificateAnalysisComponent', () => {
  let component: CertificateAnalysisComponent;
  let fixture: ComponentFixture<CertificateAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
