import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitselectionforReportComponent } from './unitselectionfor-report.component';

describe('UnitselectionforReportComponent', () => {
  let component: UnitselectionforReportComponent;
  let fixture: ComponentFixture<UnitselectionforReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitselectionforReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitselectionforReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
