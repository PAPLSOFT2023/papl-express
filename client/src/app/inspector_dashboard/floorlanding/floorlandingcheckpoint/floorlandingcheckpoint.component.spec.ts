import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorlandingcheckpointComponent } from './floorlandingcheckpoint.component';

describe('FloorlandingcheckpointComponent', () => {
  let component: FloorlandingcheckpointComponent;
  let fixture: ComponentFixture<FloorlandingcheckpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorlandingcheckpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorlandingcheckpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
