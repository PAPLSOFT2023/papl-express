import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledWorkComponent } from './scheduled-work.component';

describe('ScheduledWorkComponent', () => {
  let component: ScheduledWorkComponent;
  let fixture: ComponentFixture<ScheduledWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
