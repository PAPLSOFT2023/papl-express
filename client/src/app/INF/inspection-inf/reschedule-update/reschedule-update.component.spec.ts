import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleUpdateComponent } from './reschedule-update.component';

describe('RescheduleUpdateComponent', () => {
  let component: RescheduleUpdateComponent;
  let fixture: ComponentFixture<RescheduleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
