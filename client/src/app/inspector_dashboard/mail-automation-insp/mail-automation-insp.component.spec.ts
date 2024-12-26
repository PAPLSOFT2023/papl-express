import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAutomationInspComponent } from './mail-automation-insp.component';

describe('MailAutomationInspComponent', () => {
  let component: MailAutomationInspComponent;
  let fixture: ComponentFixture<MailAutomationInspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailAutomationInspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAutomationInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
