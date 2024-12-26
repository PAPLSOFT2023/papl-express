import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionAnalysisComponent } from './inspection-analysis.component';

describe('InspectionAnalysisComponent', () => {
  let component: InspectionAnalysisComponent;
  let fixture: ComponentFixture<InspectionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
