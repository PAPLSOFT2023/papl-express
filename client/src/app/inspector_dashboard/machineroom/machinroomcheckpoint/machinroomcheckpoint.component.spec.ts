import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinroomcheckpointComponent } from './machinroomcheckpoint.component';

describe('MachinroomcheckpointComponent', () => {
  let component: MachinroomcheckpointComponent;
  let fixture: ComponentFixture<MachinroomcheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinroomcheckpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachinroomcheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
