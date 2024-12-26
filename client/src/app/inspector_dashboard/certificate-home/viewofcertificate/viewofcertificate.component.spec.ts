import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewofcertificateComponent } from './viewofcertificate.component';

describe('ViewofcertificateComponent', () => {
  let component: ViewofcertificateComponent;
  let fixture: ComponentFixture<ViewofcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewofcertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewofcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
