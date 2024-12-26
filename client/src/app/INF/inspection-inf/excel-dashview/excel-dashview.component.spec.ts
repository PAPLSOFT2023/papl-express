import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDashviewComponent } from './excel-dashview.component';

describe('ExcelDashviewComponent', () => {
  let component: ExcelDashviewComponent;
  let fixture: ComponentFixture<ExcelDashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDashviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelDashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
