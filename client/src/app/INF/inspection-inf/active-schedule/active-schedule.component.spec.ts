import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveScheduleComponent } from './active-schedule.component';

describe('ActiveScheduleComponent', () => {
  let component: ActiveScheduleComponent;
  let fixture: ComponentFixture<ActiveScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
