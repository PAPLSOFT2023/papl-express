import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionInfComponent } from './inspection-inf.component';

describe('InspectionInfComponent', () => {
  let component: InspectionInfComponent;
  let fixture: ComponentFixture<InspectionInfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionInfComponent]
    });
    fixture = TestBed.createComponent(InspectionInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
