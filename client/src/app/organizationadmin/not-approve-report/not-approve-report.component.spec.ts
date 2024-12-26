import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApproveReportComponent } from './not-approve-report.component';

describe('NotApproveReportComponent', () => {
  let component: NotApproveReportComponent;
  let fixture: ComponentFixture<NotApproveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotApproveReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotApproveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
