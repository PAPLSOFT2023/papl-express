import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReportsComponent } from './rejected-reports.component';

describe('RejectedReportsComponent', () => {
  let component: RejectedReportsComponent;
  let fixture: ComponentFixture<RejectedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
