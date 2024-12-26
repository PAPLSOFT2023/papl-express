import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleRequestComponent } from './reschedule-request.component';

describe('RescheduleRequestComponent', () => {
  let component: RescheduleRequestComponent;
  let fixture: ComponentFixture<RescheduleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
