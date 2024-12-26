import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionTimeComponent } from './inspection-time.component';

describe('InspectionTimeComponent', () => {
  let component: InspectionTimeComponent;
  let fixture: ComponentFixture<InspectionTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
