import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDashviewComponent } from './certificate-dashview.component';

describe('CertificateDashviewComponent', () => {
  let component: CertificateDashviewComponent;
  let fixture: ComponentFixture<CertificateDashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDashviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateDashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
