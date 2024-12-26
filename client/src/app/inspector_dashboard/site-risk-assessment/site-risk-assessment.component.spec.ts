import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRiskAssessmentComponent } from './site-risk-assessment.component';

describe('SiteRiskAssessmentComponent', () => {
  let component: SiteRiskAssessmentComponent;
  let fixture: ComponentFixture<SiteRiskAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteRiskAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteRiskAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
