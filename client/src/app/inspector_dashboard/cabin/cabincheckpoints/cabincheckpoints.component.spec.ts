import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabincheckpointsComponent } from './cabincheckpoints.component';

describe('CabincheckpointsComponent', () => {
  let component: CabincheckpointsComponent;
  let fixture: ComponentFixture<CabincheckpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabincheckpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabincheckpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
