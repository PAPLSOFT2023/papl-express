import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionTypeComponent } from './inspection-type.component';

describe('InspectionTypeComponent', () => {
  let component: InspectionTypeComponent;
  let fixture: ComponentFixture<InspectionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
