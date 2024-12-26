import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateOComponent } from './certificate-o.component';

describe('CertificateOComponent', () => {
  let component: CertificateOComponent;
  let fixture: ComponentFixture<CertificateOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
