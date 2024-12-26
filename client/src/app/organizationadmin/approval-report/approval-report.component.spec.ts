import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalReportComponent } from './approval-report.component';

describe('ApprovalReportComponent', () => {
  let component: ApprovalReportComponent;
  let fixture: ComponentFixture<ApprovalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
