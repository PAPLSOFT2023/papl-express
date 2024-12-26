import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionScheduledComponent } from './inspection-scheduled.component';

describe('InspectionScheduledComponent', () => {
  let component: InspectionScheduledComponent;
  let fixture: ComponentFixture<InspectionScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionScheduledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
