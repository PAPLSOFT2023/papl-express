import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingReportComponent } from './existing-report.component';

describe('ExistingReportComponent', () => {
  let component: ExistingReportComponent;
  let fixture: ComponentFixture<ExistingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
