import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledInfComponent } from './scheduled-inf.component';

describe('ScheduledInfComponent', () => {
  let component: ScheduledInfComponent;
  let fixture: ComponentFixture<ScheduledInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledInfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
