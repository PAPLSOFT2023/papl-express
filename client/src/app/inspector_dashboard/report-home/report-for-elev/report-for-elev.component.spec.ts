import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForElevComponent } from './report-for-elev.component';

describe('ReportForElevComponent', () => {
  let component: ReportForElevComponent;
  let fixture: ComponentFixture<ReportForElevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportForElevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportForElevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
