import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCertificateComponent } from './download-certificate.component';

describe('DownloadCertificateComponent', () => {
  let component: DownloadCertificateComponent;
  let fixture: ComponentFixture<DownloadCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
