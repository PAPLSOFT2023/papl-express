import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionTimeShiftComponent } from './inspection-time-shift.component';

describe('InspectionTimeShiftComponent', () => {
  let component: InspectionTimeShiftComponent;
  let fixture: ComponentFixture<InspectionTimeShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionTimeShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionTimeShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
