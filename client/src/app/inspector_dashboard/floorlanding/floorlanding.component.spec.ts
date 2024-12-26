import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorlandingComponent } from './floorlanding.component';

describe('FloorlandingComponent', () => {
  let component: FloorlandingComponent;
  let fixture: ComponentFixture<FloorlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorlandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
