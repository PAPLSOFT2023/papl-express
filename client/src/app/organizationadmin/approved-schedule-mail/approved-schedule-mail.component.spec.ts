import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedScheduleMailComponent } from './approved-schedule-mail.component';

describe('ApprovedScheduleMailComponent', () => {
  let component: ApprovedScheduleMailComponent;
  let fixture: ComponentFixture<ApprovedScheduleMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedScheduleMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedScheduleMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
