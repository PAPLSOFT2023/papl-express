import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitcheckpointsComponent } from './pitcheckpoints.component';

describe('PitcheckpointsComponent', () => {
  let component: PitcheckpointsComponent;
  let fixture: ComponentFixture<PitcheckpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitcheckpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitcheckpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
