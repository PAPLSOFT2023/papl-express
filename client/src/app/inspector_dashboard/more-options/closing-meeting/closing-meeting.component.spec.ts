import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingMeetingComponent } from './closing-meeting.component';

describe('ClosingMeetingComponent', () => {
  let component: ClosingMeetingComponent;
  let fixture: ComponentFixture<ClosingMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
