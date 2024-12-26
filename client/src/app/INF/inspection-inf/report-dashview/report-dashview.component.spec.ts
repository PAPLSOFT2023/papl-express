import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDashviewComponent } from './report-dashview.component';

describe('ReportDashviewComponent', () => {
  let component: ReportDashviewComponent;
  let fixture: ComponentFixture<ReportDashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDashviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
