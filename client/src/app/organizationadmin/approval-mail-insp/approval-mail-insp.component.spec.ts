import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalMailInspComponent } from './approval-mail-insp.component';

describe('ApprovalMailInspComponent', () => {
  let component: ApprovalMailInspComponent;
  let fixture: ComponentFixture<ApprovalMailInspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalMailInspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalMailInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
